import { HashRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Explorer from "./pages/Explorer";
import SpeciesProfile from "./pages/SpeciesProfile";
import ResearchData from "./pages/ResearchData";
import Compare from "./pages/Compare";
import Predictions from "./pages/Predictions";
import Recommendations from "./pages/Recommendations";
import AdminPortal from "./pages/AdminPortal";
import { EcoAIBot } from "./components/EcoAIBot";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/species" element={<Explorer />} />
        <Route path="/species/:id" element={<SpeciesProfile />} />
        <Route path="/research-data" element={<ResearchData />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/admin" element={<AdminPortal />} />
      </Routes>
      <EcoAIBot />
    </HashRouter>
  );
}

export default App;