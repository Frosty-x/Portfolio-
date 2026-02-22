import { useEffect, useRef, useState, useCallback } from "react";
import { mat4, quat, vec2, vec3 } from "gl-matrix";
import { Link } from "react-router-dom";

// ─── Shaders ────────────────────────────────────────────────────────────────

const discVertShaderSource = `#version 300 es

uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

#define PI 3.141593

void main() {
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);
    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
    float radius = length(centerPos.xyz);

    if (gl_VertexID > 0) {
        vec3 rotationAxis = uRotationAxisVelocity.xyz;
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
        float strength = dot(stretchDir, relativeVertexPos);
        float invAbsStrength = min(0., abs(strength) - 1.);
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
        worldPosition.xyz += stretchDir * strength;
    }

    worldPosition.xyz = radius * normalize(worldPosition.xyz);
    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;
    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
    vUvs = aModelUvs;
    vInstanceId = gl_InstanceID;
}
`;

const discFragShaderSource = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;

out vec4 outColor;
in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

void main() {
    int itemIndex = vInstanceId % uItemCount;
    int cellX = itemIndex % uAtlasSize;
    int cellY = itemIndex / uAtlasSize;
    vec2 cellSize = vec2(1.0) / vec2(float(uAtlasSize));
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;

    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
    st = st * cellSize + cellOffset;

    outColor = texture(uTex, st);
    outColor.a *= vAlpha;
}
`;

// ─── Geometry ────────────────────────────────────────────────────────────────

class Face {
  constructor(a, b, c) { this.a = a; this.b = b; this.c = c; }
}

class Vertex {
  constructor(x, y, z) {
    this.position = vec3.fromValues(x, y, z);
    this.normal   = vec3.create();
    this.uv       = vec2.create();
  }
}

class Geometry {
  constructor() { this.vertices = []; this.faces = []; }

  addVertex(...args) {
    for (let i = 0; i < args.length; i += 3)
      this.vertices.push(new Vertex(args[i], args[i + 1], args[i + 2]));
    return this;
  }

  addFace(...args) {
    for (let i = 0; i < args.length; i += 3)
      this.faces.push(new Face(args[i], args[i + 1], args[i + 2]));
    return this;
  }

  get lastVertex() { return this.vertices[this.vertices.length - 1]; }

  subdivide(divisions = 1) {
    const cache = {};
    let f = this.faces;
    for (let d = 0; d < divisions; ++d) {
      const next = new Array(f.length * 4);
      f.forEach((face, ndx) => {
        const mAB = this._mid(face.a, face.b, cache);
        const mBC = this._mid(face.b, face.c, cache);
        const mCA = this._mid(face.c, face.a, cache);
        const i = ndx * 4;
        next[i]     = new Face(face.a, mAB, mCA);
        next[i + 1] = new Face(face.b, mBC, mAB);
        next[i + 2] = new Face(face.c, mCA, mBC);
        next[i + 3] = new Face(mAB, mBC, mCA);
      });
      f = next;
    }
    this.faces = f;
    return this;
  }

  spherize(radius = 1) {
    this.vertices.forEach((v) => {
      vec3.normalize(v.normal, v.position);
      vec3.scale(v.position, v.normal, radius);
    });
    return this;
  }

  get data() {
    return {
      vertices: new Float32Array(this.vertices.flatMap((v) => Array.from(v.position))),
      indices:  new Uint16Array(this.faces.flatMap((f) => [f.a, f.b, f.c])),
      normals:  new Float32Array(this.vertices.flatMap((v) => Array.from(v.normal))),
      uvs:      new Float32Array(this.vertices.flatMap((v) => Array.from(v.uv))),
    };
  }

  _mid(ndxA, ndxB, cache) {
    const key = ndxA < ndxB ? `${ndxB}_${ndxA}` : `${ndxA}_${ndxB}`;
    if (key in cache) return cache[key];
    const a = this.vertices[ndxA].position;
    const b = this.vertices[ndxB].position;
    const ndx = this.vertices.length;
    cache[key] = ndx;
    this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    return ndx;
  }
}

class IcosahedronGeometry extends Geometry {
  constructor() {
    super();
    const t = Math.sqrt(5) * 0.5 + 0.5;
    this.addVertex(
      -1, t, 0,  1, t, 0, -1,-t, 0,  1,-t, 0,
       0,-1, t,  0, 1, t,  0,-1,-t,  0, 1,-t,
       t, 0,-1,  t, 0, 1, -t, 0,-1, -t, 0, 1,
    ).addFace(
      0,11,5, 0,5,1, 0,1,7, 0,7,10, 0,10,11,
      1,5,9, 5,11,4, 11,10,2, 10,7,6, 7,1,8,
      3,9,4, 3,4,2, 3,2,6, 3,6,8, 3,8,9,
      4,9,5, 2,4,11, 6,2,10, 8,6,7, 9,8,1,
    );
  }
}

class DiscGeometry extends Geometry {
  constructor(steps = 4, radius = 1) {
    super();
    steps = Math.max(4, steps);
    const alpha = (2 * Math.PI) / steps;
    this.addVertex(0, 0, 0);
    this.lastVertex.uv[0] = 0.5;
    this.lastVertex.uv[1] = 0.5;
    for (let i = 0; i < steps; ++i) {
      const x = Math.cos(alpha * i);
      const y = Math.sin(alpha * i);
      this.addVertex(radius * x, radius * y, 0);
      this.lastVertex.uv[0] = x * 0.5 + 0.5;
      this.lastVertex.uv[1] = y * 0.5 + 0.5;
      if (i > 0) this.addFace(0, i, i + 1);
    }
    this.addFace(0, steps, 1);
  }
}

// ─── WebGL helpers ───────────────────────────────────────────────────────────

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

function createProgram(gl, [vertSrc, fragSrc], feedbackVaryings, attribLocations) {
  const program = gl.createProgram();
  [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => {
    const s = createShader(gl, type, [vertSrc, fragSrc][ndx]);
    if (s) gl.attachShader(program, s);
  });
  if (feedbackVaryings)
    gl.transformFeedbackVaryings(program, feedbackVaryings, gl.SEPARATE_ATTRIBS);
  if (attribLocations)
    for (const k in attribLocations)
      gl.bindAttribLocation(program, attribLocations[k], k);
  gl.linkProgram(program);
  if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

function makeVertexArray(gl, bufLocNumElmPairs, indices) {
  const va = gl.createVertexArray();
  gl.bindVertexArray(va);
  for (const [buf, loc, n] of bufLocNumElmPairs) {
    if (loc === -1) continue;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, n, gl.FLOAT, false, 0, 0);
  }
  if (indices) {
    const ib = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  }
  gl.bindVertexArray(null);
  return va;
}

function resizeCanvasToDisplaySize(canvas) {
  const dpr = Math.min(2, window.devicePixelRatio);
  const w = Math.round(canvas.clientWidth * dpr);
  const h = Math.round(canvas.clientHeight * dpr);
  if (canvas.width === w && canvas.height === h) return false;
  canvas.width = w; canvas.height = h;
  return true;
}

function makeBuffer(gl, data, usage) {
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, data, usage);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return buf;
}

function setupTexture(gl, minFilter, magFilter, wrapS, wrapT) {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
  return tex;
}

// ─── ArcballControl ──────────────────────────────────────────────────────────

class ArcballControl {
  isPointerDown    = false;
  orientation      = quat.create();
  pointerRotation  = quat.create();
  rotationVelocity = 0;
  rotationAxis     = vec3.fromValues(1, 0, 0);
  snapDirection    = vec3.fromValues(0, 0, -1);
  snapTargetDirection;
  EPSILON          = 0.1;
  _IDENT           = quat.create();

  _s = {
    mid: vec2.create(),
    p:   vec3.create(),
    q:   vec3.create(),
    a:   vec3.create(),
    b:   vec3.create(),
    snap: quat.create(),
    comb: quat.create(),
    axis: vec3.create(),
  };

  constructor(canvas, updateCallback) {
    this.canvas = canvas;
    this.updateCallback   = updateCallback || (() => {});
    this.pointerPos       = vec2.create();
    this.prevPointerPos   = vec2.create();
    this._rotVel          = 0;
    this._combinedQuat    = quat.create();

    const onDown  = (e) => {
      vec2.set(this.pointerPos, e.clientX, e.clientY);
      vec2.copy(this.prevPointerPos, this.pointerPos);
      this.isPointerDown = true;
    };
    const onUp    = () => { this.isPointerDown = false; };
    const onMove  = (e) => {
      if (this.isPointerDown) vec2.set(this.pointerPos, e.clientX, e.clientY);
    };

    canvas.addEventListener("pointerdown",  onDown);
    canvas.addEventListener("pointerup",    onUp);
    canvas.addEventListener("pointerleave", onUp);
    canvas.addEventListener("pointermove",  onMove);
    canvas.style.touchAction = "none";
    this._off = () => {
      canvas.removeEventListener("pointerdown",  onDown);
      canvas.removeEventListener("pointerup",    onUp);
      canvas.removeEventListener("pointerleave", onUp);
      canvas.removeEventListener("pointermove",  onMove);
    };
  }

  destroy() { this._off(); }

  update(deltaTime, targetFrameDuration = 16) {
    const ts = deltaTime / targetFrameDuration + 0.00001;
    const s  = this._s;
    let af   = ts;
    quat.identity(s.snap);

    if (this.isPointerDown) {
      const intensity = 0.3 * ts;
      vec2.sub(s.mid, this.pointerPos, this.prevPointerPos);
      vec2.scale(s.mid, s.mid, intensity);
      if (vec2.sqrLen(s.mid) > this.EPSILON) {
        vec2.add(s.mid, this.prevPointerPos, s.mid);
        this._project(s.mid, s.p);
        this._project(this.prevPointerPos, s.q);
        vec3.normalize(s.a, s.p);
        vec3.normalize(s.b, s.q);
        vec2.copy(this.prevPointerPos, s.mid);
        af *= 5 / ts;
        this._qFromVecs(s.a, s.b, this.pointerRotation, af);
      } else {
        quat.slerp(this.pointerRotation, this.pointerRotation, this._IDENT, intensity);
      }
    } else {
      quat.slerp(this.pointerRotation, this.pointerRotation, this._IDENT, 0.1 * ts);
      if (this.snapTargetDirection) {
        const sqrDist = vec3.squaredDistance(this.snapTargetDirection, this.snapDirection);
        af *= 0.2 * Math.max(0.1, 1 - sqrDist * 10);
        this._qFromVecs(this.snapTargetDirection, this.snapDirection, s.snap, af);
      }
    }

    quat.multiply(s.comb, s.snap, this.pointerRotation);
    quat.multiply(this.orientation, s.comb, this.orientation);
    quat.normalize(this.orientation, this.orientation);

    quat.slerp(this._combinedQuat, this._combinedQuat, s.comb, 0.8 * ts);
    quat.normalize(this._combinedQuat, this._combinedQuat);

    const rad = Math.acos(Math.min(1, this._combinedQuat[3])) * 2;
    const sin = Math.sin(rad / 2);
    let rv = 0;
    if (sin > 0.000001) {
      rv = rad / (2 * Math.PI);
      this.rotationAxis[0] = this._combinedQuat[0] / sin;
      this.rotationAxis[1] = this._combinedQuat[1] / sin;
      this.rotationAxis[2] = this._combinedQuat[2] / sin;
    }

    this._rotVel += (rv - this._rotVel) * 0.5 * ts;
    this.rotationVelocity = this._rotVel / ts;
    this.updateCallback(deltaTime);
  }

  _qFromVecs(a, b, out, af = 1) {
    vec3.cross(this._s.axis, a, b);
    vec3.normalize(this._s.axis, this._s.axis);
    quat.setAxisAngle(out, this._s.axis, Math.acos(Math.max(-1, Math.min(1, vec3.dot(a, b)))) * af);
    return out;
  }

  _project(pos, out) {
    const r = 2, w = this.canvas.clientWidth, h = this.canvas.clientHeight;
    const s = Math.max(w, h) - 1;
    const x = (2 * pos[0] - w - 1) / s;
    const y = (2 * pos[1] - h - 1) / s;
    const xy = x * x + y * y, rr = r * r;
    vec3.set(out, -x, y, xy <= rr / 2 ? Math.sqrt(rr - xy) : rr / Math.sqrt(xy));
    return out;
  }
}

// ─── InfiniteGridMenu ────────────────────────────────────────────────────────

class InfiniteGridMenu {
  TARGET_FRAME_DURATION = 1000 / 60;
  SPHERE_RADIUS         = 2;

  #t  = 0;
  #dt = 0;
  #df = 0;
  #f  = 0;
  #raf     = null;
  #dead    = false;

  camera = {
    matrix: mat4.create(),
    near: 0.1, far: 40,
    fov: Math.PI / 4, aspect: 1,
    position: vec3.fromValues(0, 0, 3),
    up: vec3.fromValues(0, 1, 0),
    matrices: { view: mat4.create(), projection: mat4.create(), inversProjection: mat4.create() },
  };

  smoothRotVel  = 0;
  scaleFactor   = 1.0;
  movementActive = false;

  _m = Array.from({ length: 5 }, () => mat4.create());
  _pWorld = vec3.create();
  _pNeg   = vec3.create();

  constructor(canvas, items, onActiveItemChange, onMovementChange, onInit = null, scale = 1.0) {
    this.canvas = canvas;
    this.items  = items || [];
    this.onActiveItem  = onActiveItemChange || (() => {});
    this.onMovement    = onMovementChange   || (() => {});
    this.scaleFactor   = scale;
    this.camera.position[2] = 3 * scale;
    this.#init(onInit);
  }

  resize() {
    vec2.set(
      this.viewportSize || (this.viewportSize = vec2.create()),
      this.canvas.clientWidth, this.canvas.clientHeight,
    );
    const gl = this.gl;
    if (resizeCanvasToDisplaySize(gl.canvas))
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    this.#updateProj(gl);
  }

  run(time = 0) {
    if (this.#dead) return;
    this.#dt = Math.min(32, time - this.#t);
    this.#t  = time;
    this.#df = this.#dt / this.TARGET_FRAME_DURATION;
    this.#f += this.#df;
    this.#animate(this.#dt);
    this.#render();
    this.#raf = requestAnimationFrame((t) => this.run(t));
  }

  destroy() {
    this.#dead = true;
    if (this.#raf !== null) cancelAnimationFrame(this.#raf);
    this.control?.destroy();
    const gl = this.gl;
    if (!gl) return;
    gl.deleteProgram(this.discProgram);
    if (this.discInstances?.buffer) gl.deleteBuffer(this.discInstances.buffer);
    if (this.tex) gl.deleteTexture(this.tex);
    if (this.discVAO) gl.deleteVertexArray(this.discVAO);
  }

  #init(onInit) {
    this.gl = this.canvas.getContext("webgl2", { antialias: true, alpha: true });
    const gl = this.gl;
    if (!gl) throw new Error("No WebGL 2 context!");

    this.viewportSize   = vec2.fromValues(this.canvas.clientWidth, this.canvas.clientHeight);
    this.drawBufferSize = vec2.clone(this.viewportSize);

    this.discProgram = createProgram(
      gl, [discVertShaderSource, discFragShaderSource], null,
      { aModelPosition: 0, aModelNormal: 1, aModelUvs: 2, aInstanceMatrix: 3 },
    );

    const p = this.discProgram;
    this.loc = {
      aModelPosition:        gl.getAttribLocation(p,  "aModelPosition"),
      aModelUvs:             gl.getAttribLocation(p,  "aModelUvs"),
      aInstanceMatrix:       gl.getAttribLocation(p,  "aInstanceMatrix"),
      uWorldMatrix:          gl.getUniformLocation(p, "uWorldMatrix"),
      uViewMatrix:           gl.getUniformLocation(p, "uViewMatrix"),
      uProjectionMatrix:     gl.getUniformLocation(p, "uProjectionMatrix"),
      uCameraPosition:       gl.getUniformLocation(p, "uCameraPosition"),
      uScaleFactor:          gl.getUniformLocation(p, "uScaleFactor"),
      uRotationAxisVelocity: gl.getUniformLocation(p, "uRotationAxisVelocity"),
      uTex:                  gl.getUniformLocation(p, "uTex"),
      uFrames:               gl.getUniformLocation(p, "uFrames"),
      uItemCount:            gl.getUniformLocation(p, "uItemCount"),
      uAtlasSize:            gl.getUniformLocation(p, "uAtlasSize"),
    };

    const discGeo = new DiscGeometry(56, 1);
    this.discBufs = discGeo.data;
    this.discVAO  = makeVertexArray(gl, [
      [makeBuffer(gl, this.discBufs.vertices, gl.STATIC_DRAW), this.loc.aModelPosition, 3],
      [makeBuffer(gl, this.discBufs.uvs,      gl.STATIC_DRAW), this.loc.aModelUvs,      2],
    ], this.discBufs.indices);

    const ico = new IcosahedronGeometry();
    ico.subdivide(1).spherize(this.SPHERE_RADIUS);
    this.instancePos   = ico.vertices.map((v) => v.position);
    this.DISC_COUNT    = ico.vertices.length;
    this.#initInstances(this.DISC_COUNT);

    this.worldMatrix = mat4.create();
    this.#initTexture();

    this.control = new ArcballControl(this.canvas, (dt) => this.#onCtrlUpdate(dt));
    this.#updateCam();
    this.#updateProj(gl);
    this.resize();
    if (onInit) onInit(this);
  }

  #initTexture() {
    const gl       = this.gl;
    this.tex       = setupTexture(gl, gl.LINEAR_MIPMAP_LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
    const count    = Math.max(1, this.items.length);
    this.atlasSize = Math.ceil(Math.sqrt(count));
    const CELL     = 512;
    const ac       = document.createElement("canvas");
    ac.width       = this.atlasSize * CELL;
    ac.height      = this.atlasSize * CELL;
    const ctx      = ac.getContext("2d");

    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, ac.width, ac.height);

    const upload = () => {
      if (this.#dead) return;
      gl.bindTexture(gl.TEXTURE_2D, this.tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ac);
      gl.generateMipmap(gl.TEXTURE_2D);
    };

    upload();

    Promise.all(
      this.items.map((item) => new Promise((res) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload  = () => res(img);
        img.onerror = () => res(null);
        img.src     = item.image;
      })),
    ).then((images) => {
      if (this.#dead) return;
      images.forEach((img, i) => {
        if (!img) return;
        const x = (i % this.atlasSize) * CELL;
        const y = Math.floor(i / this.atlasSize) * CELL;
        const ar = img.naturalWidth / img.naturalHeight;
        let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
        if (ar > 1) { sw = img.naturalHeight; sx = (img.naturalWidth  - sw) / 2; }
        else        { sh = img.naturalWidth;  sy = (img.naturalHeight - sh) / 2; }
        ctx.drawImage(img, sx, sy, sw, sh, x, y, CELL, CELL);
      });
      upload();
    });
  }

  #initInstances(count) {
    const gl = this.gl;
    this.inst = {
      arr:    new Float32Array(count * 16),
      mats:   [],
      buffer: gl.createBuffer(),
    };
    for (let i = 0; i < count; ++i) {
      const slice = new Float32Array(this.inst.arr.buffer, i * 64, 16);
      slice.set(mat4.create());
      this.inst.mats.push(slice);
    }
    gl.bindVertexArray(this.discVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.inst.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.inst.arr.byteLength, gl.DYNAMIC_DRAW);
    const STRIDE = 64;
    for (let j = 0; j < 4; ++j) {
      const loc = this.loc.aInstanceMatrix + j;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, STRIDE, j * 16);
      gl.vertexAttribDivisor(loc, 1);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
  }

  #animate(dt) {
    this.control.update(dt, this.TARGET_FRAME_DURATION);
    const [m0, m1, m2, m3, m4] = this._m;
    const R = this.SPHERE_RADIUS;
    const SCALE = 0.25, SCALE_I = 0.6;

    this.instancePos.forEach((src, ndx) => {
      vec3.transformQuat(this._pWorld, src, this.control.orientation);
      const p  = this._pWorld;
      const fs = ((Math.abs(p[2]) / R) * SCALE_I + (1 - SCALE_I)) * SCALE;

      vec3.negate(this._pNeg, p);
      mat4.fromTranslation(m1, this._pNeg);
      mat4.targetTo(m2, [0, 0, 0], p, [0, 1, 0]);
      mat4.fromScaling(m3, [fs, fs, fs]);
      mat4.fromTranslation(m4, [0, 0, -R]);

      mat4.identity(m0);
      mat4.multiply(m0, m0, m1);
      mat4.multiply(m0, m0, m2);
      mat4.multiply(m0, m0, m3);
      mat4.multiply(m0, m0, m4);
      mat4.copy(this.inst.mats[ndx], m0);
    });

    const gl = this.gl;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.inst.buffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.inst.arr);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.smoothRotVel = this.control.rotationVelocity;
  }

  #render() {
    const gl = this.gl, L = this.loc;
    gl.useProgram(this.discProgram);
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    // Use alpha: true context + clear to transparent so CSS bg shows through
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(L.uWorldMatrix,      false, this.worldMatrix);
    gl.uniformMatrix4fv(L.uViewMatrix,       false, this.camera.matrices.view);
    gl.uniformMatrix4fv(L.uProjectionMatrix, false, this.camera.matrices.projection);
    gl.uniform3fv(L.uCameraPosition, this.camera.position);
    gl.uniform4f(
      L.uRotationAxisVelocity,
      this.control.rotationAxis[0], this.control.rotationAxis[1], this.control.rotationAxis[2],
      this.smoothRotVel * 1.1,
    );
    gl.uniform1i(L.uItemCount,   this.items.length);
    gl.uniform1i(L.uAtlasSize,   this.atlasSize);
    gl.uniform1f(L.uFrames,      this.#f);
    gl.uniform1f(L.uScaleFactor, this.scaleFactor);
    gl.uniform1i(L.uTex, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.bindVertexArray(this.discVAO);
    gl.drawElementsInstanced(
      gl.TRIANGLES, this.discBufs.indices.length, gl.UNSIGNED_SHORT, 0, this.DISC_COUNT,
    );
  }

  #updateCam() {
    mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);
    mat4.invert(this.camera.matrices.view, this.camera.matrix);
  }

  #updateProj(gl) {
    this.camera.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const h = this.SPHERE_RADIUS * 0.35, d = this.camera.position[2];
    this.camera.fov = this.camera.aspect > 1
      ? 2 * Math.atan(h / d)
      : 2 * Math.atan(h / this.camera.aspect / d);
    mat4.perspective(this.camera.matrices.projection, this.camera.fov, this.camera.aspect, this.camera.near, this.camera.far);
    mat4.invert(this.camera.matrices.inversProjection, this.camera.matrices.projection);
  }

  #onCtrlUpdate(dt) {
    const ts = dt / this.TARGET_FRAME_DURATION + 0.0001;
    let damping = 5 / ts;
    let camZ    = 3 * this.scaleFactor;
    const moving = this.control.isPointerDown || Math.abs(this.smoothRotVel) > 0.01;
    if (moving !== this.movementActive) {
      this.movementActive = moving;
      this.onMovement(moving);
    }
    if (!this.control.isPointerDown) {
      const ni = this.#nearest();
      this.onActiveItem(ni % Math.max(1, this.items.length));
      this.control.snapTargetDirection = vec3.normalize(vec3.create(), this.#worldPos(ni));
    } else {
      camZ += this.control.rotationVelocity * 80 + 2.5;
      damping = 7 / ts;
    }
    this.camera.position[2] += (camZ - this.camera.position[2]) / damping;
    this.#updateCam();
  }

  #nearest() {
    const inv = quat.conjugate(quat.create(), this.control.orientation);
    const nt  = vec3.transformQuat(vec3.create(), this.control.snapDirection, inv);
    let maxD  = -1, best = 0;
    for (let i = 0; i < this.instancePos.length; ++i) {
      const d = vec3.dot(nt, this.instancePos[i]);
      if (d > maxD) { maxD = d; best = i; }
    }
    return best;
  }

  #worldPos(i) {
    return vec3.transformQuat(vec3.create(), this.instancePos[i], this.control.orientation);
  }
}

// ─── React component ─────────────────────────────────────────────────────────

const DEFAULT_ITEMS = [
  { image: "https://picsum.photos/900/900?grayscale", link: "", title: "", description: "" },
];
const MOBILE_BP = 640;

export default function InfiniteMenu({ items = [], scale = 1.0 }) {
  const canvasRef  = useRef(null);
  const sketchRef  = useRef(null);

  const [activeItem, setActiveItem] = useState(null);
  const [isMoving,   setIsMoving]   = useState(false);
  const [isMobile,   setIsMobile]   = useState(
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BP : false,
  );

  const resolvedItems = items.length ? items : DEFAULT_ITEMS;

  const onActiveItem = useCallback(
    (index) => setActiveItem(resolvedItems[index % resolvedItems.length]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    sketchRef.current = new InfiniteGridMenu(
      canvas, resolvedItems, onActiveItem, setIsMoving, (sk) => sk.run(), scale,
    );

    const onResize = () => {
      sketchRef.current?.resize();
      setIsMobile(window.innerWidth < MOBILE_BP);
    };
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
      sketchRef.current?.destroy();
      sketchRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, scale]);

  const isExternal = activeItem?.link?.startsWith("http");
  const ease = "ease-[cubic-bezier(0.25,0.1,0.25,1.0)]";
  const visible = "opacity-100 pointer-events-auto duration-[500ms]";
  const hidden  = "opacity-0 pointer-events-none duration-[100ms]";

  // Derive a plain string for aria-label — title may be a JSX element
  const titleLabel = activeItem?.link?.replace("/", "") ?? "";

  return (
    <div className="relative w-full h-full bg-zinc-950">

      {/* ── Checkerboard background ── */}
      <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, #0a0a0a 25%, transparent 25%),
            linear-gradient(-45deg, #0a0a0a 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #0a0a0a 75%),
            linear-gradient(-45deg, transparent 75%, #0a0a0a 75%)
          `,
          backgroundSize: '4px 4px',
          backgroundPosition: '0 0, 0 2px, 2px -2px, -2px 0px'
        }} />
      </div>

      {/* ── Grain texture ── */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'repeat',
        backgroundSize: '100px 100px'
      }} />

      {/* ── WebGL canvas — z-10, sits above background layers ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 cursor-grab w-full h-full outline-none active:cursor-grabbing block"
        style={{ background: 'transparent' }}
      />

      {/* ── UI layer — z-20, always above the canvas ── */}
      {activeItem && (
        <div className="absolute inset-0 z-20 pointer-events-none">

          {/* ── Title (left on desktop, top-center on mobile) ── */}
          <div
            className={[
              "select-none absolute transition-all",
              ease,
              isMobile
                ? "left-1/2 -translate-x-1/2 top-[6%] text-center w-[90vw]"
                : "left-[18%] top-1/2 -translate-y-1/2 max-w-[12ch]",
              isMoving ? hidden : visible,
            ].join(" ")}
          >
            <div
              className="inline-block px-4 py-2 rounded-xl"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
            >
              <h2 className="font-black text-white text-[1.5rem] sm:text-[2.2rem] xl:text-[2.8rem] leading-tight tracking-wide">
                {activeItem.title}
              </h2>
            </div>
          </div>

          {/* ── Description (right on desktop, bottom-center on mobile) ── */}
          <div
            className={[
              "select-none absolute transition-all",
              ease,
              isMobile
                ? "left-1/2 -translate-x-1/2 bottom-[14%] text-center max-w-[80vw]"
                : "right-[18%] top-1/2 max-w-[12ch]",
              isMoving
                ? isMobile ? hidden : `${hidden} -translate-y-1/2`
                : isMobile ? visible : `${visible} -translate-y-1/2`,
            ].join(" ")}
          >
            <div
              className="inline-block px-4 py-2 rounded-xl"
              style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
            >
              <p className="text-orange-200 font-light text-[0.9rem] sm:text-[1rem] xl:text-[1.05rem] leading-relaxed">
                {activeItem.description}
              </p>
            </div>
          </div>

          {/* ── CTA button (bottom center) ── */}
          <Link
            to={activeItem.link}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : undefined}
            aria-label={`Navigate to ${titleLabel}`}
            className={[
              "absolute left-1/2 -translate-x-1/2 pointer-events-auto",
              "grid place-items-center",
              "w-[52px] h-[52px] sm:w-[60px] sm:h-[60px]",
              "bg-orange-500 hover:bg-orange-400 border-[3px] border-orange-300/40",
              "rounded-full cursor-pointer transition-all shadow-lg shadow-orange-500/30",
              ease,
              isMoving
                ? "bottom-[-80px] opacity-0 pointer-events-none duration-[100ms] scale-0"
                : `${isMobile ? "bottom-[4%]" : "bottom-14"} opacity-100 duration-[500ms] scale-100`,
            ].join(" ")}
          >
            <span aria-hidden className="select-none text-white text-[22px] sm:text-[26px] leading-none mt-0.5">
              ↗
            </span>
          </Link>
        </div>
      )}
    </div>
  );
}