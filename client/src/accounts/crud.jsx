import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const CrudPage = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', description: '' });

  // Fungsi untuk mengambil data dari server (Read)
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Mengelola perubahan input pada form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mengelola submit form (Create & Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Update data
        await axios.put(`http://localhost:5000/api/items/${formData.id}`, formData);
        Swal.fire('Berhasil!', 'Data berhasil diubah.', 'success');
      } else {
        // Tambah data baru
        await axios.post('http://localhost:5000/api/items', formData);
        Swal.fire('Berhasil!', 'Data berhasil ditambahkan.', 'success');
      }
      setFormData({ id: null, name: '', description: '' }); // Reset form
      fetchData(); // Muat ulang data
    } catch (error) {
      Swal.fire('Gagal!', 'Terjadi kesalahan.', 'error');
      console.error("Error submitting data:", error);
    }
  };

  // Mengatur form untuk mode Edit
  const handleEdit = (item) => {
    setFormData(item);
  };

  // Menghapus data (Delete)
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/items/${id}`);
          Swal.fire('Terhapus!', 'Data berhasil dihapus.', 'success');
          fetchData();
        } catch (error) {
          Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus.', 'error');
          console.error("Error deleting data:", error);
        }
      }
    });
  };

  return (
    <div>
      <h2>Halaman CRUD</h2>

      {/* Form Tambah/Ubah Data */}
      <form onSubmit={handleSubmit}>
        <h3>{formData.id ? 'Ubah Data' : 'Tambah Data Baru'}</h3>
        <div>
          <label>Nama:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Deskripsi:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">{formData.id ? 'Simpan Perubahan' : 'Tambah'}</button>
      </form>

      {/* Tampilan Daftar Data */}
      <h3>Daftar Item</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Ubah</button>
                <button onClick={() => handleDelete(item.id)}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudPage;