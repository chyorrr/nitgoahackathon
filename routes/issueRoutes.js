const express = require('express');
const router = express.Router();
const Issue = require('../models/Issue'); // Import your Issue model
const multer = require('multer'); // Import Multer
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware

// This tells Multer where to save the files
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/'); // Create an 'uploads' folder in your project root
  },
  filename: function(req, file, cb) {
    // Create a unique filename
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// --- GET ALL ISSUES (for the map) ---
// GET /api/issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find(); // Finds all issues
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// VVVV  ADD THIS MIDDLEWARE  VVVV
// --- REPORT A NEW ISSUE (now SECURE and with image) ---
// We add 'authMiddleware' to the array of middleware
router.post('/', [authMiddleware, upload.single('issueImage')], async (req, res) => {
  try {
    const { title, description, category, latitude, longitude } = req.body;

    // 'req.user.id' is now available thanks to our middleware!
    const userId = req.user.id; 

    let imageUrl = req.file ? req.file.path : '';

    const newIssue = new Issue({
      title,
      description,
      category,
      location: {
        coordinates: [longitude, latitude]
      },
      imageUrl: imageUrl,
      reportedBy: userId // <-- HERE IT IS! We log who reported it
    });

    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- UPDATE AN ISSUE'S STATUS (now SECURE) ---
// We add 'authMiddleware' right before the async function
router.put('/:id', authMiddleware, async (req, res) => {

  // (Optional but good) Check the user's role
  if (req.user.role === 'citizen') {
    return res.status(403).json({ message: 'Not authorized to update status' });
  }

  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status }, // Update the status
      { new: true } // Return the updated document
    );
    res.json(updatedIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
