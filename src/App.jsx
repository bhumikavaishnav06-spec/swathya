import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import FirstAid from "./pages/FirstAid";
import Hospitals from "./pages/Hospitals";
import MaternalChild from "./pages/MaternalChild";
import Schemes from "./pages/Schemes";
import SymptomChecker from "./pages/SymptomChecker";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/first-aid" element={<FirstAid />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/maternal" element={<MaternalChild />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/symptoms" element={<SymptomChecker />} />
      </Routes>
    </BrowserRouter>
  );
}
