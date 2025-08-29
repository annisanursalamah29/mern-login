import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import API_URL from '../apiConfig'; // Import API_URL dari file konfigurasi

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      
      Swal.fire({
        icon: 'success',
        title: 'Login Berhasil!',
        text: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        // Navigasi ke halaman lain setelah SweetAlert2 selesai
        navigate('/crud');
      });

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.';
      
      Swal.fire({
        icon: 'error',
        title: 'Login Gagal!',
        text: errorMessage,
      });
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;