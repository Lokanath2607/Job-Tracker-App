const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const Job = require('../models/Job');
const auth = require('../middleware/authMiddleware');

// Configure Multer storage for resume uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage: storage });

// Get all jobs for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new job application with optional resume upload
router.post('/', auth, upload.single('resume'), async (req, res) => {
  try {
    const { companyName, jobTitle, location, status, jobUrl, notes, appliedDate } = req.body;
    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

    const newJob = new Job({
      // Ensure key matches 'user' as defined in your Mongoose schema
      user: req.user.id || req.user._id, 
      companyName,
      jobTitle,
      location,
      status: status || 'Applied',
      jobUrl,
      notes,
      appliedDate,
      resumeUrl
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error("Backend Save Error:", err.message);
    res.status(400).json({ error: err.message });
  }
});

// Update a job application (Crucial for dragging & dropping across Kanban columns)
// PUT update job status
// UPDATE job status by ID
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;

    const updatedJob = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id || req.user._id },
      { status },
      { new: true } // Returns the updated document
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found or unauthorized' });
    }

    res.json(updatedJob);
  } catch (err) {
    console.error('Error updating status:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete a job application
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedJob = await Job.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;