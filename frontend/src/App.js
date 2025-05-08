import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerRegister from './pages/CustomerRegister';
import AdminRegister from './pages/AdminRegister';
import VerifyEmail from './pages/VerifyEmail';
import AdminLogin from './pages/AdminLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<CustomerRegister />} />
        <Route path="/register-admin" element={<AdminRegister />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
