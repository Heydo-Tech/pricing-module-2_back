// // routes/specialRules.js
// const express = require('express');
// const { SpecialRule } = require('../models/models');
// const { authenticateToken } = require('../middleware/auth');

// const router = express.Router();

// // Get all special rules
// router.get('/', authenticateToken, async (req, res) => {
//   try {
//     const specialRules = await SpecialRule.find();
//     res.json(specialRules);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Get special rule by ID
// router.get('/:id', authenticateToken, async (req, res) => {
//   try {
//     const specialRule = await SpecialRule.findOne({ id: req.params.id });
//     if (!specialRule) return res.status(404).json({ message: 'Special rule not found' });
//     res.json(specialRule);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Add a new special rule
// router.post('/', authenticateToken, async (req, res) => {
//   try {
//     const newSpecialRule = new SpecialRule(req.body);
//     await newSpecialRule.save();
//     res.status(201).json(newSpecialRule);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Update a special rule by ID
// router.put('/:id', authenticateToken, async (req, res) => {
//   try {
//     const updatedSpecialRule = await SpecialRule.findOneAndUpdate(
//       { id: req.params.id },
//       req.body,
//       { new: true }
//     );
//     if (!updatedSpecialRule) return res.status(404).json({ message: 'Special rule not found' });
//     res.json(updatedSpecialRule);
//   } catch (err) {
  //     res.status(500).json({ message: 'Server error', error: err.message });
  //   }
  // });
  
  // // Delete a special rule by ID
  // router.delete('/:id', authenticateToken, async (req, res) => {
    //   try {
      //     const deletedSpecialRule = await SpecialRule.findOneAndDelete({ id: req.params.id });
      //     if (!deletedSpecialRule) return res.status(404).json({ message: 'Special rule not found' });
      //     res.json({ message: 'Special rule deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// module.exports = router;

const express = require('express');
const { SpecialRule } = require('../models/models'); // Import SpecialRule schema
const validateMarginMiddleware = require('../middleware/validateMargin'); // Import middleware
const router = express.Router();

// Fetch all special rules
router.get('/', async (req, res) => {
  try {
    const specialRules = await SpecialRule.find();
    res.json(specialRules);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add a new special rule
router.post('/',validateMarginMiddleware, async (req, res) => {
  try {
    // console.log(req.body);
    const specialRule = new SpecialRule(req.body);
    const savedRule = await specialRule.save();
    res.status(201).json(savedRule);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save rule', error: err.message });
  }
});

// Update a special rule
router.put('/:id',validateMarginMiddleware, async (req, res) => {
  try {
    const updatedRule = await SpecialRule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRule);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update rule', error: err.message });
  }
});

//delete a special rule
router.delete('/:id', async (req, res) => {
  try {
    const deletedRule = await SpecialRule.findByIdAndDelete(req.params.id);
    res.json({ message: 'Special rule deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete rule', error: err.message });
  }
});

module.exports = router;




