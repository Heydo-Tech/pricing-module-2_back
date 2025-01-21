// Mongoose Models for Portal 2
const mongoose = require('mongoose');

// Utility function to generate alphanumeric IDs
const generateId = (prefix) => {
  const randomId = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `${prefix}${randomId}`;
};

// User Model
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  role: { type: String, required: true, enum: ['admin', 'user'] },
});

// Category Model
const CategorySchema = new mongoose.Schema({
  id: { type: String, default: () => generateId('CT'), unique: true },
  name: { type: String, required: true, unique: true },
  margin_percentage: { type: Number, required: true },
  operation: { type: String, required: true, enum: ['+', '-'] },
});

// Brand Model
const BrandSchema = new mongoose.Schema({
  id: { type: String, default: () => generateId('BR'), unique: true },
  name: { type: String, required: true, unique: true },
  margin_percentage: { type: Number, required: true },
  operation: { type: String, required: true, enum: ['+', '-'] },
});

// Location Model
const LocationSchema = new mongoose.Schema({
  id: { type: String, default: () => generateId('LC'), unique: true },
  name: { type: String, required: true, unique: true },
  margin_percentage: { type: Number, required: true },
  operation: { type: String, required: true, enum: ['+', '-'] },
});

// Essential Level Model
const EssentialLevelSchema = new mongoose.Schema({
  id: { type: String, default: () => generateId('EL'), unique: true },
  name: { type: String, required: true, unique: true },
  margin_percentage: { type: Number, required: true },
  operation: { type: String, required: true, enum: ['+', '-'] },
});

// Special Rules Model
const SpecialRuleSchema = new mongoose.Schema({
  brand_id: { type: String, required: true },
  brand: { type: String, required: true },
  category_id: { type: String, required: true },
  category: { type: String, required: true },
  location_id: { type: String, required: true },
  location: { type: String, required: true },
  essential_level_id: { type: String, required: true },
  essential_level: { type: String, required: true },
  pack_size: { type: Number, required: true },
  unit_of_measurement: { type: String, required: true },
  total_margin: { type: Number, required: true },
  final_margin: { type: Number, required: true },
});

// Export Models
module.exports = {
  User: mongoose.model('User', UserSchema),
  Category: mongoose.model('Category', CategorySchema),
  Brand: mongoose.model('Brand', BrandSchema),
  Location: mongoose.model('Location', LocationSchema),
  EssentialLevel: mongoose.model('EssentialLevel', EssentialLevelSchema),
  SpecialRule: mongoose.model('SpecialRule', SpecialRuleSchema),
};
