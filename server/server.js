import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from './routes/auth.js'; // Mengimpor rute otentikasi
import userRoutes from './routes/userRoutes.js'; // Mengimpor rute user   

dotenv.config();

const app = express();

app.use(helmet());

// Batasi 100 permintaan per 15 menit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Konfigurasi CORS untuk mengizinkan permintaan dari origin tertentu
const corsOptions = {
  origin: [
    "http://localhost:5174",
    "https://annisanursalamah29.github.io",
    "https://annisanursalamah29.github.io/mern-login",
  ],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Menggunakan rute otentikasi dari file terpisah
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); 

// rute local untuk pengecekan server berjalan
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;