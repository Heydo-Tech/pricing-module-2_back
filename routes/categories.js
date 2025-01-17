// routes/categories.js
const express = require('express');
const { Category } = require('../models/models');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all categories
router.get('/', authenticateToken, async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get category by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const category = await Category.findOne({ id: req.params.id });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add a new category
router.post('/', authenticateToken, async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update a category by ID
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const updatedCategory = await Category.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a category by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({ id: req.params.id });
    if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
router.get('/search', authenticateToken, async (req, res) => {
    const { name } = req.query;
    try {
      const categories = await Category.find({ name: new RegExp(name, 'i') });
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
  // Update multiple categories
  router.put('/', authenticateToken, async (req, res) => {
    const { categories } = req.body;
    try {
      const updatePromises = categories.map(category =>
        Category.findOneAndUpdate({ id: category.id }, category, { new: true })
      );
      const updatedCategories = await Promise.all(updatePromises);
      res.json(updatedCategories);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  

module.exports = router;
