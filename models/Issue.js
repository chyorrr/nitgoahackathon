const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true }, // e.g., 'pothole', 'streetlight'
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved'], // Allowed statuses
    default: 'Open'
  },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  },
  imageUrl: { type: String }, // URL to the uploaded photo
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId, // Connects this issue to a User
    ref: 'User'
  },
  votes: { type: Number, default: 0 }
}, { timestamps: true }); // Adds `createdAt` and `updatedAt` fields

module.exports = mongoose.model('Issue', issueSchema);
