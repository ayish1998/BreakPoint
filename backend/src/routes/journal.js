const express = require('express');
const { z } = require('zod');
const { requireAuth } = require('../middleware/auth');
const JournalEntry = require('../models/JournalEntry');

const router = express.Router();
const { chat } = require('../services/gptService');

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
    // AI mood/sentiment analysis (best-effort, non-blocking)
    let sentiment, moodScore;
    try {
      const analysis = await chat({
        messages: [
          { role: 'system', content: 'You analyze sentiment and mood succinctly. Respond as JSON with keys: sentiment (positive|neutral|negative), mood (one or two words), score (-1..1).' },
          { role: 'user', content: `Analyze the mood of this journal entry: "${data.content}"` },
        ],
      });
      const parsed = JSON.parse((analysis || '{}').trim());
      sentiment = parsed.sentiment;
      moodScore = typeof parsed.score === 'number' ? parsed.score : undefined;
    } catch (_) {}

    const created = await JournalEntry.create({ ...data, userId: req.user.userId, sentiment, moodScore });
    res.json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

