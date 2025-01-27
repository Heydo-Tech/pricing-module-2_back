// routes/essentialLevels.js
const express = require('express');
const { EssentialLevel } = require('../models/models');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all essential levels
router.get('/', authenticateToken, async (req, res) => {
  try {
    const essentialLevels = await EssentialLevel.find();
    res.json(essentialLevels);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get essential level by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const essentialLevel = await EssentialLevel.findOne({ id: req.params.id });
    if (!essentialLevel) return res.status(404).json({ message: 'Essential level not found' });
    res.json(essentialLevel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add a new essential level
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newEssentialLevel = new EssentialLevel(req.body);
    await newEssentialLevel.save();
    res.status(201).json(newEssentialLevel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update an essential level by ID
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedEssentialLevel = await EssentialLevel.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedEssentialLevel) return res.status(404).json({ message: 'Essential level not found' });
    res.json(updatedEssentialLevel);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete an essential level by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedEssentialLevel = await EssentialLevel.findOneAndDelete({ id: req.params.id });
    if (!deletedEssentialLevel) return res.status(404).json({ message: 'Essential level not found' });
    res.json({ message: 'Essential level deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
router.put('/', authenticateToken, async (req, res) => {
  const { essentialLevels } = req.body;
  try {
    const updatePromises = essentialLevels.map(level =>
      EssentialLevel.findOneAndUpdate({ id: level.id }, level, { new: true })
    );
    const updatedCategories = await Promise.all(updatePromises);
    res.json(updatedCategories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



module.exports = router;
