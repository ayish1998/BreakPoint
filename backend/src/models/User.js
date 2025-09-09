const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String },
    name: { type: String },
    githubId: { type: String, index: true },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);

