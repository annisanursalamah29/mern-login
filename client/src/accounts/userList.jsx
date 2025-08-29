import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_URL from '../apiConfig'; // Impor API_URL dari file konfigurasi
import '../App.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Endpoint spesifik untuk user
    const USER_API_URL = `${API_URL.replace('/auth', '')}/users`;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(USER_API_URL);
            setUsers(response.data);
            setIsLoading(false);
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Gagal mengambil data pengguna.'
            });
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Apakah kamu yakin?',
            text: "Anda tidak akan dapat mengembalikan ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!'
        });

        if (result.isConfirmed) {
            try {
                // Gunakan URL yang fleksibel untuk permintaan DELETE
                await axios.delete(`${USER_API_URL}/${id}`);
                Swal.fire({
                    title: 'Dihapus!',
                    text: 'Pengguna Anda telah dihapus.',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                });
                fetchUsers();
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal!',
                    text: 'Gagal menghapus pengguna.'
                });
            }
        }
    };

    if (isLoading) {
        return <div style={{ textAlign: 'center' }}>Memuat data...</div>;
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2>Daftar Pengguna</h2>
            {users.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>No.</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Username</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID Pengguna</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.username}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user._id}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <button 
                                        onClick={() => handleDelete(user._id)} 
                                        style={{ 
                                            backgroundColor: '#f44336', 
                                            color: 'white', 
                                            border: 'none', 
                                            padding: '8px 12px', 
                                            cursor: 'pointer',
                                            borderRadius: '4px'
                                        }}>
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Tidak ada data pengguna yang tersedia.</p>
            )}
        </div>
    );
};

export default UserList;