const Adventure = require('../models/Adventures.js');

const confirmAdventure = async (req, res) => {
  try {

    const { username, uid, cid, cpid, pathIndex } = req.body;

    const parsedUid = Number(uid);
    const parsedCid = Number(cid);
    const parsedCpid = Number(cpid);

    if (!username || isNaN(parsedUid) || isNaN(parsedCid) || isNaN(parsedCpid)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    let adventure = await Adventure.findOne({ uid: parsedUid });

    if (!adventure) {
      await Adventure.create({
        username,
        uid: parsedUid,
        activeAdventure: { cid: parsedCid, cpid: parsedCpid, pathIndex, numCompleted: 0 },
        adventuresList: []
      });

      return res.status(201).json({ message: 'Adventure Schema created and Adventure Confirmed.' });
    }

    adventure.activeAdventure = { cid: parsedCid, cpid: parsedCpid, pathIndex, numCompleted: 0 };
    await adventure.save();

    return res.status(200).json({ message: 'Adventure Confirmed.' });

  } catch (err) {
    console.error('Error accessing adventure:', err);
    return res.status(500).send('Internal server error');
  }
};

const fetchActiveAdventure = async (req, res) => {

  const { uid } = req.query;

  try {

    let adventurer = await Adventure.findOne({ uid });

    if (!adventurer){
      return res.status(200).json(null);
    }

    if ((!adventurer.activeAdventure) || (Object.keys(adventurer?.activeAdventure).length === 0)){
      return res.status(200).json(null);
    }

    return res.status(200).json(adventurer.activeAdventure);


  } catch(e) {
    console.error('Error accessing adventure:', err);
    return res.status(500).send('Internal server error');
  }

}

const fetchCategory = async (req, res) => {
  try {
    const { username, uid, cid } = req.query;

    const parsedUid = Number(uid);
    const parsedCid = Number(cid);

    if (!username || isNaN(parsedUid) || isNaN(parsedCid)) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    const defaultStatus = [
      { cpid: 0, status: 'Available' },
      { cpid: 1, status: 'Locked' },
      { cpid: 2, status: 'Locked' }
    ];

    let adventure = await Adventure.findOne({ uid: parsedUid });

    if (!adventure) {
      await Adventure.create({
        username,
        uid: parsedUid,
        adventuresList: [{ cid: parsedCid, adventureStatus: defaultStatus }]
      });

      return res.status(201).json({ cid: parsedCid, adventureStatus: defaultStatus });
    }

    if (!Array.isArray(adventure.adventuresList)) {
      adventure.adventuresList = [];
    }

    let relAdventure = adventure.adventuresList.find((adv) => adv.cid === parsedCid);

    if (!relAdventure) {
      const newEntry = { cid: parsedCid, adventureStatus: defaultStatus };
      adventure.adventuresList.push(newEntry);
      await adventure.save();

      return res.status(200).json(newEntry);
    }

    return res.status(200).json(relAdventure);

  } catch (err) {
    console.error('Error accessing adventure:', err);
    return res.status(500).send('Internal server error');
  }
};

module.exports = {
  confirmAdventure,
  fetchCategory,
  fetchActiveAdventure
};
