const mongoose = require('mongoose');

const item = new mongoose.Schema({
  item_id: Number,
  item_name: String,
  quantity: { type: Number, default: 0 },
  times_used: { type: Number, default: 0 },
  date_discovered: Date
});

const inventory = new mongoose.Schema({
  uid: Number,
  items: [item]
});

const Inventory = mongoose.model('Inventory', inventory);

module.exports = Inventory;
