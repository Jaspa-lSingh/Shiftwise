import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Login from "./Pages/Pages/Login";
import EmployeeLogin from "./Pages/Pages/EmployeeLogin";
import AdminLogin from "./Pages/Pages/AdminLogin";
import Signup from "./Pages/Pages/Signup";
import Footer from "./Components/Footer";
import AdminRoutes from "./routes/AdminRoutes";
import EmployeeRoutes from "./Pages/Employee/EmployeeRoutes";
import FeaturesPage from "./Pages/Pages/FeaturesPage"; // Add this import

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isEmployee = location.pathname.startsWith("/Employee");

  return (
    <>
      {(!isAdmin && !isEmployee) && <NavBar />}
      <div className="pt-16 pb-32">
        <Routes>
          {/* Add FeaturesPage route */}
          <Route path="/" element={<FeaturesPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          
          {/* Existing routes */}
          <Route path="/login/employee" element={<EmployeeLogin />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Employee/*" element={<EmployeeRoutes />} />
        </Routes>
      </div>
      {(!isAdmin && !isEmployee) && <Footer />}
    </>
  );
}

export default App;