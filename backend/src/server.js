require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectToDatabase } = require('./utils/db');

const authRoutes = require('./routes/auth');
const journalRoutes = require('./routes/journal');
const aiRoutes = require('./routes/ai');

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.get('/health', (_req, res) => res.json({ ok: true, service: 'breakpoint-backend' }));

app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/ai', aiRoutes);

const port = process.env.PORT || 4000;
connectToDatabase()
  .then(() => {
    app.listen(port, () => console.log(`Backend listening on http://localhost:${port}`));
  })
  .catch((err) => {
    console.error('Failed to connect to database', err);
    process.exit(1);
  });


