const express = require('express')
const router = express.Router()
const Feedback = require('../models/feedbackModel')

// Add feedback
router.post('/add', async (req, res) => {
  try {
    // Extract token from Authorization header
    let name = '';
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = require('jwt-decode')(token);
        name = decoded.name || '';
      } catch (e) {
        // ignore, fallback to req.body.name
      }
    }
    // fallback: use name from body if not found in token
    if (!name && req.body.name) name = req.body.name;
    const feedback = new Feedback({
      ...req.body,
      name
    });
    await feedback.save();
    res.status(201).json({ success: true, message: 'Feedback submitted', feedback });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to submit feedback', error: err.message });
  }
})

// Get all feedback
router.get('/getall', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 })
    res.json(feedbacks)
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch feedback', error: err.message })
  }
})




router.delete('/delete/:id', async (req, res) => {
    try {
        const feedbackId = req.params.id
        const feedback = await Feedback.findByIdAndDelete(feedbackId)
        if (!feedback) {
        return res.status(404).json({ success: false, message: 'Feedback not found' })
        }
        res.json({ success: true, message: 'Feedback deleted successfully' })
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete feedback', error: err.message })
    }
    });

module.exports = router
