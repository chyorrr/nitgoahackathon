const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // We'll hash this later!
  role: {
    type: String,
    enum: ['citizen', 'moderator', 'official'], // Defines the allowed roles
    default: 'citizen'
  }
});

module.exports = mongoose.model('User', userSchema);
