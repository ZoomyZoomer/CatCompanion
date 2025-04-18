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

    const { username, uid, cid } = req.body;

    


  } catch (err) {
    console.error('Error accessing adventure:', err);
    res.status(500).send('Internal server error');
  }
};

module.exports = confirmAdventure;
