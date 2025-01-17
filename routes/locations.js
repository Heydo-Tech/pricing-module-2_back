// routes/locations.js
const express = require('express');
const { Location } = require('../models/models');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all locations
router.get('/', authenticateToken, async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get location by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const location = await Location.findOne({ id: req.params.id });
    if (!location) return res.status(404).json({ message: 'Location not found' });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add a new location
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update a location by ID
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedLocation = await Location.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedLocation) return res.status(404).json({ message: 'Location not found' });
    res.json(updatedLocation);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a location by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedLocation = await Location.findOneAndDelete({ id: req.params.id });
    if (!deletedLocation) return res.status(404).json({ message: 'Location not found' });
    res.json({ message: 'Location deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.put('/', authenticateToken, async (req, res) => {
    const { locations } = req.body;
    try {
      const updatePromises = locations.map(location =>
        Location.findOneAndUpdate({ id: location.id }, location, { new: true })
      );
      const updatedCategories = await Promise.all(updatePromises);
      res.json(updatedCategories);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

module.exports = router;
