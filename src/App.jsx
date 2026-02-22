import Menu from "./Menu";
import { Route, Routes } from "react-router-dom";
import Project from "./Project";
import Connect from "./Connect";
import Portfolio from "./Portfolio";
import Hobbies from "./Hobbies";
function App() {
  return (
    <Routes>
     
      <Route path="/" element={<Menu />} />
      <Route path="/Project" element={<Project />} />
      <Route path="/Connect" element={<Connect />} />
      <Route path="/About" element={<Portfolio />} />
      <Route path="/Hobbies" element={<Hobbies />} />
      
    </Routes>
  );
}

export default App;
