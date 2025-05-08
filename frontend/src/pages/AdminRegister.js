import React, { useState } from 'react';
import { api } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import {handleSuccess, handleError} from '../utils'

const AdminRegister = () => {
  const [form, setForm] = useState({ first_name: '', last_name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', { ...form, role: 'admin' });
      handleSuccess('Registered! Check your email to verify.');
      navigate('/verify-email');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      handleError(errorMessage); 
      setError(errorMessage);
    }
  };

  return (
    <div className="container mt-5">
    
      <h2>Admin Registration</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary">Register as Admin</button>
      </form>

      <div>
        <p>Are you a customer? <Link to="/">Register as Customer</Link></p>
      </div>
    </div>
  );
};

export default AdminRegister;
