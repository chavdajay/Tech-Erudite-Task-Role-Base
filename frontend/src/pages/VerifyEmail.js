// src/pages/VerifyEmail.js
import React, { useState } from 'react';
import { api } from '../api';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils';

const VerifyEmail = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleVerify = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/verify-email', { email, verificationCode: code });
      console.log('Verify Response:', res?.data);

      handleSuccess(res?.data?.message || 'Email verified successfully.');
  
      const role = res?.data?.data?.role;
      console.log('Role:', res?.data?.data?.role);
      if (role === 'admin') {
        navigate('/admin-login');
      } else {
        navigate('/');
      }
    } catch (err) {
      handleError(err.response?.data?.message || 'Verification failed');
    }
  };  

  return (
    <div className="container mt-5">
      <h2>Email Verification</h2>
      <form onSubmit={handleVerify}>
        <input className="form-control mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input className="form-control mb-2" placeholder="Verification Code" onChange={e => setCode(e.target.value)} required />
        <button className="btn btn-success">Verify</button>
      </form>
    </div>
  );
};

export default VerifyEmail;
