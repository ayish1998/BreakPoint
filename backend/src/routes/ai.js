const express = require('express');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
// Auth is optional for AI to allow quick access
// const { requireAuth } = require('../middleware/auth');
const { chat } = require('../services/gptService');
const JournalEntry = require('../models/JournalEntry');

const router = express.Router();

// router.use(requireAuth);

const chatSchema = z.object({
  messages: z.array(z.object({ role: z.enum(['system', 'user', 'assistant']), content: z.string() })),
  includeJournal: z.boolean().optional(),
});

router.post('/chat', async (req, res) => {
  try {
    const { messages, includeJournal } = chatSchema.parse(req.body);
    const system = {
      role: 'system',
      content:
        'You are BreakPoint, a developer-focused stress management assistant. Prioritize concise, kind, and actionable suggestions. For deep mode, use reflective prompts and mindfulness techniques.',
    };
    const context = [system];
    if (includeJournal) {
      const token = req.cookies?.token || (req.headers.authorization || '').replace('Bearer ', '');
      if (token) {
        try {
          const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
          const recent = await JournalEntry.find({ userId: payload.userId })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('content createdAt');
          if (recent.length) {
            const journalSummary = recent
              .map((e) => `- (${new Date(e.createdAt).toISOString()}) ${e.content}`)
              .join('\n');
            context.push({
              role: 'system',
              content: `User's recent journal entries (latest first):\n${journalSummary}`,
            });
          }
        } catch (_) {}
      }
    }
    const content = await chat({ messages: [...context, ...messages] });
    res.json({ content });
  } catch (err) {
    console.error('AI /chat error:', err?.message || err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

