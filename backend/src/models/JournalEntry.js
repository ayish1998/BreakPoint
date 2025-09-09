const { Schema, model, Types } = require('mongoose');

const journalEntrySchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: 'User', index: true, required: true },
    content: { type: String, required: true },
    mood: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = model('JournalEntry', journalEntrySchema);

