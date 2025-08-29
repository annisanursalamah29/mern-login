import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Rute Registrasi
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Cek apakah username sudah ada
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username sudah digunakan. Silakan pilih yang lain.' });
        }

        // --- VALIDASI PASSWORD LEBIH KETAT DAN RINGKAS ---
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ 
                message: 'Password tidak valid. Harus mengandung minimal 8 karakter, satu huruf besar, satu huruf kecil, satu angka, dan satu karakter spesial.',
            });
        }
        // --- AKHIR VALIDASI ---

        // Langsung buat objek user baru. Hashing password akan otomatis dilakukan di model Mongoose.
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'Pengguna berhasil didaftarkan!' });

    } catch (error) {
        console.error("Registrasi Gagal:", error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat mendaftar. Silakan coba lagi.' });
    }
});

// Rute Login (Sudah OK, tidak ada perubahan besar)
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Username atau Password salah.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Username atau Password salah.' });
        }

        res.status(200).json({ message: 'Login berhasil!' });
    } catch (error) {
        console.error("Login Gagal:", error);
        res.status(500).json({ message: 'Terjadi kesalahan server saat login. Silakan coba lagi.' });
    }
});

export default router;