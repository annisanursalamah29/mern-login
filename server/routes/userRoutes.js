// routes/userRoutes.js
import express from 'express';
import User from '../models/User.js'; // Asumsikan kamu punya model User

const router = express.Router();

// Contoh: Mendapatkan semua pengguna
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rute untuk menghapus pengguna berdasarkan ID
// Menggunakan DELETE request ke /api/users/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL

  try {
    // Logika untuk menghapus pengguna dari database
    // Asumsi model User memiliki metode findByIdAndDelete atau setara
    const user = await User.findByIdAndDelete(id); 

    if (!user) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
    }

    res.status(200).json({ message: 'Pengguna berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: 'Gagal menghapus pengguna', error: error.message });
  }
});


export default router;