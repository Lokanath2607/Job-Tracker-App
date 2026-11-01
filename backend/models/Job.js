const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true // Requires user ID to save
  },
  companyName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  location: String,
  status: { type: String, default: 'Applied' },
  resumeUrl: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);