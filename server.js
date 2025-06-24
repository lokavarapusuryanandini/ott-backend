import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js'; // Import auth routes
// Import routes

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

// Sample route
app.get('/', (req, res) => {
  res.send('OTT Backend API is running');
});

// Use routes
app.use('/api/auth', authRoutes);

// DB + Server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
