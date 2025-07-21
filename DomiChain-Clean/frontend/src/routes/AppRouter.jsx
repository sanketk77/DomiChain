// src/routes/AppRouter.jsx

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Home from "../pages/Home";
import AddProperty from "../pages/AddProperty";
import PropertyDetails from "../pages/PropertyDetails";
import Buy from "../pages/Buy";
import Rent from "../pages/Rent";
import Sell from "../pages/Sell";
import Plots from "../pages/Plots";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* Page Content */}
      <div className="pt-20 w-full min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-property" element={<AddProperty />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/plots" element={<Plots />} />
        </Routes>
      </div>

      {/* Footer always shown */}
      <Footer />
    </BrowserRouter>
  );
}
