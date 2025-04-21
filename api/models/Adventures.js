const mongoose = require('mongoose');
const checkpointStatusSchema = new mongoose.Schema({
  cpid: Number,
  status: String
});

const adventureEntrySchema = new mongoose.Schema({
  cid: Number,
  adventureStatus: [checkpointStatusSchema]
});

const activeAdventureSchema = new mongoose.Schema({
  cid: { type: Number},
  cpid: { type: Number},
  pathIndex: Number,
  numCompleted: Number
});

const adventureSchema = new mongoose.Schema({
  username: { type: String, required: true },
  uid: { type: Number, required: true },
  activeAdventure: { type: activeAdventureSchema, default: {} },
  adventuresList: [adventureEntrySchema]
});


const Adventure = mongoose.model('Adventure', adventureSchema);

module.exports = Adventure;
