const Adventure = require('../models/Adventures.js');

const confirmAdventure = async (req, res) => {
  try {

    const { username, uid, cid, cpid } = req.body;
    
    
    const adventure = await Adventure.findOne({ uid: uid });

    // If not found, create the schema
    if (!adventure) {
      await Adventure.create({username, uid, activeAdventure: {cid, cpid}});
      res.status(201).json({message: 'Adventure Schema created and Adventure Confirmed.'});
      return;
    }

    adventure.activeAdventure = {cid, cpid};
    await adventure.save();

    res.status(200).json({message: 'Adventure Confirmed.'});
    return;

  } catch (err) {
    console.error('Error accessing adventure:', err);
    res.status(500).send('Internal server error');
  }
};

const fetchCategory = async (req, res) => {
  try {

    const { username, uid, cid } = req.query;

    const adventure = await Adventure.findOne({ uid: uid });

    if (!adventure) {
      const newAdventure = await Adventure.create({username, uid, adventuresList: [{cid, adventureStatus: [{cpid: 0, status: 'Available'}, {cpid: 1, status: 'Locked'}, {cpid: 2, status: 'Locked'}]}]});
      await newAdventure.save();

      res.status(201).json({cid, adventureStatus: [{cpid: 0, status: 'Available'}, {cpid: 1, status: 'Locked'}, {cpid: 2, status: 'Locked'}]});
      return;
    }

    const relAdventure = adventure.adventuresList.find((adv) => adv.cid === cid);
    
    if (!relAdventure) {
      adventure.adventuresList.push({cpid: 0, status: 'Available'}, {cpid: 1, status: 'Locked'}, {cpid: 2, status: 'Locked'});
      await adventure.save();
      
      res.status(200).json({cid, adventureStatus: [{cpid: 0, status: 'Available'}, {cpid: 1, status: 'Locked'}, {cpid: 2, status: 'Locked'}]});
      return;
    }

    res.status(200).json(relAdventure);
    return;


  } catch (err) {
    console.error('Error accessing adventure:', err);
    res.status(500).send('Internal server error');
  }
};

module.exports = {
  confirmAdventure,
  fetchCategory
};
