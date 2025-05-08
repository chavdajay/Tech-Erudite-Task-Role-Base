import React, { useState } from 'react';
import { api } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils';

const CustomerRegister = () => {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { ...form, role: 'customer' });
      handleSuccess('Customer registered successfully');
      navigate('/verify-email');
    } catch (err) {
      handleError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="first_name" placeholder="First Name" onChange={handleChange} required />
        <input className="form-control mb-2" name="last_name" placeholder="Last Name" onChange={handleChange} required />
        <input className="form-control mb-2" type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-primary mb-3">Register</button>
      </form>

      <div>
        <p>Are you an admin? <Link to="/register-admin">Register as Admin</Link></p>
      </div>
    </div>
  );
};

export default CustomerRegister;
