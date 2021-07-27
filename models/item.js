const mongoose = require('mongoose');
// Ensure the Categor model is processed by Mongoose (for populating Menu Item queries)
require('./category');
const itemSchema = require('./itemSchema');

module.exports = mongoose.model('Item', itemSchema);