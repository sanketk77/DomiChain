// src/routes/AppRouter.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import AddProperty from "../pages/AddProperty";
import PropertyDetails from "../pages/PropertyDetails";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-20 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
