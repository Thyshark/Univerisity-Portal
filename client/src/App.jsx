import { useState } from "react";
import AdminDashboard from "./assets/AdminDashboard";
import LecturerDashboard from "./assets/LecturerDashboard";
import StudentDashboard from "./assets/StudentDashboard";
import Login from "./assets/Login";
import Register from "./assets/Register";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { AuthProvider } from "./assets/AuthContext";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Replace the root path '/' with the Signup component */}
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/LecturerDashboard" element={<LecturerDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
