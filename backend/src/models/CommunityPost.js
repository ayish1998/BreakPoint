const { Schema, model, Types } = require('mongoose');

const communityPostSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', index: true, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    upvotes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model('CommunityPost', communityPostSchema);

