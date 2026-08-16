require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectDatabase, getDatabaseStatus } = require('./backend/config/database');
const authRoutes = require('./backend/routes/auth');
const adminRoutes = require('./backend/routes/admin');
const studentRoutes = require('./backend/routes/student');

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Ravi Sir English Classes authentication API is running.',
    database: getDatabaseStatus()
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is healthy.',
    database: getDatabaseStatus(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    database: getDatabaseStatus(),
    message: getDatabaseStatus() === 'offline' ? 'MongoDB offline. Using in-memory fallback.' : 'MongoDB connected.'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);

app.get('/api/diagnostics', (req, res) => {
  res.json({
    success: true,
    backend: 'online',
    database: getDatabaseStatus(),
    routes: ['/api/auth/login', '/api/auth/register', '/api/auth/google', '/api/auth/send-otp', '/api/auth/verify-otp', '/api/auth/forgot-password']
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found.',
    code: 'ROUTE_NOT_FOUND',
    detail: `No handler exists for ${req.method} ${req.originalUrl}.`
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error.',
    code: 'INTERNAL_SERVER_ERROR',
    detail: err.message || 'Unexpected failure.'
  });
});

connectDatabase().then((isConnected) => {
  if (isConnected) {
    console.log('MongoDB connection established.');
  } else {
    console.warn('MongoDB connection unavailable. Falling back to memory storage.');
  }
});

module.exports = app;
