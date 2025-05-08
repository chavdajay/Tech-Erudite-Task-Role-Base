import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { handleSuccess, handleError } from '../utils';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/admin-login', form);
      localStorage.setItem('token', res.data.data.token);
      handleSuccess('Login successful');
    } catch (err) {
      handleError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-2"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="btn btn-dark">Login</button>
      </form>

      <div>
        <p>Admin Register here? <Link to="/register-admin">Register as Admin</Link></p>
      </div>
    </div>
  );
};

export default AdminLogin;
