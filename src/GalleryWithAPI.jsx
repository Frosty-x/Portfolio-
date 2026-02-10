import { useEffect, useState } from "react";
import axios from "axios";
import DomeGallery from "../bits/DomeGallery";


const GalleryWithAPI = () => {
  
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("https://picsum.photos/v2/list?page=3&limit=50").then((res) => {
      setImages(
        res.data.map((img) => ({
          src: `https://picsum.photos/id/${img.id}/400/400`,
        })),
      );
    });
  }, []);

  return (
    <>
      <DomeGallery
        images={images}
        fit={1}
        minRadius={1000}
        maxVerticalRotationDeg={10}
        segments={34}
        dragDampening={4.8}
        grayscale={false}
      />
    </>
  );
};

export default GalleryWithAPI;
