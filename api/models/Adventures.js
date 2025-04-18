const mongoose = require('mongoose');

const activeAdventureSchema = new mongoose.Schema({
  cid: { type: Number, required: true },
  cpid: { type: Number, required: true }
});

const adventuresListSchema = new mongoose.Schema({

})

const adventureSchema = new mongoose.Schema({
  username: { type: String, required: true },
  uid: { type: Number, required: true },
  activeAdventure: { type: activeAdventureSchema, default: null },
  adventuresList: { type: adventuresListSchema, default: null}
});

const Adventure = mongoose.model('Adventure', adventureSchema);

module.exports = Adventure;
