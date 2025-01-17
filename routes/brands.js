// routes/brands.js
const express = require('express');
const { Brand } = require('../models/models');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all brands
router.get('/', authenticateToken, async (req, res) => {
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get brand by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const brand = await Brand.findOne({ id: req.params.id });
    if (!brand) return res.status(404).json({ message: 'Brand not found' });
    res.json(brand);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add a new brand
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newBrand = new Brand(req.body);
    await newBrand.save();
    res.status(201).json(newBrand);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update a brand by ID
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedBrand = await Brand.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedBrand) return res.status(404).json({ message: 'Brand not found' });
    res.json(updatedBrand);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
router.put('/', authenticateToken, async (req, res) => {
    const { brands } = req.body;
    try {
      const updatePromises = brands.map(brand =>
        Brand.findOneAndUpdate({ id: brand.id }, brand, { new: true })
      );
      const updatedBrands = await Promise.all(updatePromises);
      res.json(updatedBrands);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

// Delete a brand by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedBrand = await Brand.findOneAndDelete({ id: req.params.id });
    if (!deletedBrand) return res.status(404).json({ message: 'Brand not found' });
    res.json({ message: 'Brand deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
