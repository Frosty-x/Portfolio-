import Menu from "./Menu";
import { Route, Routes } from "react-router-dom";
import Project from "./Project";
import Connect from "./Connect";
import Portfolio from "./Portfolio";
function App() {
  return (
    <Routes>
     
      <Route path="/" element={<Menu />} />
      <Route path="/Project" element={<Project />} />
      <Route path="/Connect" element={<Connect />} />
      <Route path="/About" element={<Portfolio />} />

      
    </Routes>
  );
}

export default App;
