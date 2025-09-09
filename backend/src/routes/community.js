const express = require('express');
const { z } = require('zod');
const { requireAuth } = require('../middleware/auth');
const CommunityPost = require('../models/CommunityPost');

const router = express.Router();
router.use(requireAuth);

const postSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  tags: z.array(z.string()).optional(),
});

router.get('/', async (req, res) => {
  const posts = await CommunityPost.find().sort({ createdAt: -1 }).limit(100).lean();
  res.json(posts);
});

router.post('/', async (req, res) => {
  try {
    const data = postSchema.parse(req.body);
    const created = await CommunityPost.create({ ...data, userId: req.user.userId });
    res.json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/:id/upvote', async (req, res) => {
  const { id } = req.params;
  const updated = await CommunityPost.findByIdAndUpdate(id, { $inc: { upvotes: 1 } }, { new: true });
  res.json(updated);
});

module.exports = router;

