import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import authRoutes from './routes/auth.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'https://authentication-eight-beige.vercel.app',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, httpOnly: true,maxAge:24*60*60*1000 }
}));
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(process.env.PORT, () => console.log('mogodb connected server started')))
  .catch(err => console.error(err)); 
