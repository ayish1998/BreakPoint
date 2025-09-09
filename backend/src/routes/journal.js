const express = require('express');
const { z } = require('zod');
const { requireAuth } = require('../middleware/auth');
const JournalEntry = require('../models/JournalEntry');

const router = express.Router();

router.use(requireAuth);

const entrySchema = z.object({
  content: z.string().min(1),
  mood: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

router.get('/', async (req, res) => {
  const entries = await JournalEntry.find({ userId: req.user.userId }).sort({ createdAt: -1 }).limit(100);
  res.json(entries);
});

router.post('/', async (req, res) => {
  try {
    const data = entrySchema.parse(req.body);
    const created = await JournalEntry.create({ ...data, userId: req.user.userId });
    res.json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

