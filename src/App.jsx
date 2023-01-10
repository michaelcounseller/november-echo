import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Diamond from "./pages/Diamond";
import Gold from "./pages/Gold";
import Home from "./pages/Home";
import IBS from "./pages/IBS";
import Master from "./pages/Master";
import NACL from "./pages/NACL";
import Plat from "./pages/Plat";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="teams/IBS" element={<IBS/>}/>
        <Route path="teams/Gold" element={<Gold/>}/>
        <Route path="teams/Plat" element={<Plat/>}/>
        <Route path="teams/Diamond" element={<Diamond/>}/>
        <Route path="teams/Master" element={<Master/>}/>
        <Route path="teams/NACL" element={<NACL/>}/>
      </Routes>
    </>
  );
}

export default App;
