import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import API_URL from '../apiConfig'; // Import API_URL dari file konfigurasi

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/register`, { username, password });
      
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: response.data.message,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setUsername('');
        setPassword('');
        navigate('/login');
      });

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Terjadi kesalahan tidak dikenal.';
      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Registrasi</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: '10px' }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ width: '100%', padding: '10px', cursor: isLoading ? 'not-allowed' : 'pointer' }}>
          {isLoading ? 'Memuat...' : 'Daftar'}
        </button>
      </form>
    </div>
  );
};

export default Register;