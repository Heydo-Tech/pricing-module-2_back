// // routes/auth.js
// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const { User } = require('../models/models');
// require('dotenv').config();
// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET ;

// router.get('/', (req, res) => { 
//     res.send('Auth route1');
//     }
// );
// // Login Route
// router.post('/login', async (req, res) => {
//     // console.log(JWT_SECRET)
    
//   const { username, password } = req.body;
//    console.log(username);

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Verify the password
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     // Generate a JWT
//     const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
//       expiresIn: '5h',
//     });

//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Registration Route
// router.post('/register', async (req, res) => {
//   const { username, password, role } = req.body;

//   try {
//     // Check if the user already exists
//     const existingUser = await User.findOne({ username });
//     if (existingUser) {
//       return res.status(409).json({ message: 'User already exists' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create and save the new user
//     const newUser = new User({ username, password: hashedPassword, role });
//     await newUser.save();

//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Logout Route (Optional - Token Blacklisting)
// // You can implement token blacklisting logic here if needed.

// module.exports = router;


const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/models'); // Assuming your models are in models.js
require('dotenv').config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT and extract user info
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user data to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token.' });
  }
};

// Middleware to verify admin access
const verifyAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

// Test Route
router.get('/', (req, res) => {
  res.send('Auth route');
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '5h', // Token expires in 5 hours
    });

    res.json({ token, role: user.role }); // Include role in the response for the frontend to use
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Registration Route
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create New User Route (Admin Only)
router.post('/create-user', verifyToken, verifyAdmin, async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: 'New user created successfully', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Example route to check role (Optional)
router.get('/admin-check', verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: 'Admin access verified.' });
});

module.exports = router;
