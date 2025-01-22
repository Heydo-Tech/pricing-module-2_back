// const express = require('express');
// const authRoutes = require('../middleware/auth');
// const categoryRoutes = require('./categories');
// const brandRoutes = require('./brands');
// const locationRoutes = require('./locations');
// const essentialLevelRoutes = require('./essentialLevels');
// const specialRuleRoutes = require('./specialRules');

// const router = express.Router();

// router.use('/auth', authRoutes);
// router.use('/categories', categoryRoutes);
// router.use('/brands', brandRoutes);
// router.use('/locations', locationRoutes);
// router.use('/essential-levels', essentialLevelRoutes);
// router.use('/special-rules', specialRuleRoutes);

// module.exports = router;

require('dotenv').config();
const express = require('express');
const { authenticateToken } = require('../middleware/auth'); // Import middleware function
const categoryRoutes = require('./categories');
const brandRoutes = require('./brands');
const locationRoutes = require('./locations');
const essentialLevelRoutes = require('./essentialLevels');
const specialRuleRoutes = require('./specialRules');
const authRoutes = require('./auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'API Working  ' });
}   );

router.use('/auth', authRoutes); // Authentication routes
// Use authentication middleware only when necessary
router.use('/categories', authenticateToken, categoryRoutes);
router.use('/brands', authenticateToken, brandRoutes);
router.use('/locations', authenticateToken, locationRoutes);
router.use('/essential-levels', authenticateToken, essentialLevelRoutes);
router.use('/special-rules', authenticateToken, specialRuleRoutes);

module.exports = router;
