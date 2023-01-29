import React, { useContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Diamond from "./pages/Diamond";
import Gold from "./pages/Gold";
import Home from "./pages/Home";
import IBS from "./pages/IBS";
import Master from "./pages/Master";
import NACL from "./pages/NACL";
import Plat from "./pages/Plat";
import Profile from "./pages/Profile";

const IDContext = React.createContext();

export function useCounter() {
  return useContext(IDContext);
}

function App() {
  const [counter, setID] = useState(0);

  return (
    <>
      <NavBar />
      <IDContext.Provider value={[counter, setID]}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="teams/IBS" element={<IBS />} />
            <Route path="teams/Gold" element={<Gold />} />
            <Route path="teams/Plat" element={<Plat />} />
            <Route path="teams/Diamond" element={<Diamond />} />
            <Route path="teams/Master" element={<Master />} />
            <Route path="teams/NACL" element={<NACL />} />
            <Route path="player/:playerName" element={<Profile />} />
          </Routes>
      </IDContext.Provider>
    </>
  );
}

export default App;
