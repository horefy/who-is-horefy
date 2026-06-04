import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import WhoAmI from "./pages/WhoAmI/WhoAmI";
import Service from "./pages/My_service/my_service";
import Contact from "./pages/contact/contact";
import Avis from "./pages/avis/avis_client";
import Navbar from "./pages/navbar/navbar";

export default function App() {
  return (
      <Routes>
         <Route path="*" element={<Navbar />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/WhoAmI" element={<WhoAmI />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/avis" element={<Avis />} />
      </Routes>
  );
}