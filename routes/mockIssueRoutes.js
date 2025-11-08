const express = require('express');
const router = express.Router();

// Very small in-memory mock store useful for local dev when Mongo is unavailable
let mockIssues = [
  {
    _id: '1',
    title: 'Sample pothole',
    description: 'Demo issue created by mock route',
    category: 'Potholes',
    status: 'Open',
    location: { coordinates: [73.8278, 15.4909] },
    imageUrl: '',
    reportedBy: null,
    votes: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// GET /api/issues
router.get('/', (req, res) => {
  res.json(mockIssues);
});

// POST /api/issues - accepts multipart form (but here we just accept fields)
router.post('/', (req, res) => {
  try {
    // If body is empty because caller used FormData, express.json won't parse it
    // In that case we try to read fields from req.body (may be empty) and fallback
    const title = req.body.title || 'Untitled Issue';
    const description = req.body.description || '';
    const category = req.body.category || 'Others';

    const latitude = parseFloat(req.body.latitude) || 15.4909;
    const longitude = parseFloat(req.body.longitude) || 73.8278;

    const newIssue = {
      _id: String(Date.now()),
      title,
      description,
      category,
      status: 'Open',
      location: { coordinates: [longitude, latitude] },
      imageUrl: '',
      reportedBy: null,
      votes: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockIssues.unshift(newIssue);
    res.status(201).json(newIssue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
