const DailyLog = require('../models/DailyLog.js');
const cloudinary = require('../configs/cloudinaryConfig');

function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  const sendMood = async (req, res) => {
    const { uid, mood, selectedItems, ratings, selectedImage, caption } = req.body;
  
    try {
      let log = await DailyLog.findOne({ uid });
  
      if (!log) {
        await DailyLog.create({
          uid,
          moods: []
        });
  
        return res.status(500).json({ message: 'DailyLog Schema not found' });
      }
  
      const relLog = log.moods.find((item) => isSameDay(item.date, new Date()));
  
      const logEntry = {
        mood,
        logItems: [
          { item: selectedItems[0], rating: ratings[0] },
          { item: selectedItems[1], rating: ratings[1] },
          { item: selectedItems[2], rating: ratings[2] }
        ],
        imageUri: selectedImage,
        caption
      };
  
      if (relLog) {
        Object.assign(relLog, logEntry);
        await log.save();
        return res.status(200).json({ message: 'Log successfully updated' });
      }
  
      log.moods.push({ ...logEntry, date: new Date() });
      await log.save();
      return res.status(200).json({ message: 'Log successfully created' });
  
    } catch (e) {
      console.log({ error: e });
      return res.status(500).json({ message: 'Something went wrong', error: e });
    }
  };
  

const fetchCurrentMood = async (req, res) => {

    const { uid } = req.query

    try {

        let log = await DailyLog.findOne({ uid });

        if (!log){
            return res.status(200).json(null);
        }

        const relLog = log.moods.find((item) => isSameDay(item.date, new Date()));

        if (!relLog){
            return res.status(200).json(null);
        }

        return res.status(200).json(relLog);

    } catch(e) {
        console.log({error: e});
        return res.status(500);
    }

}

const fetchDailyByMonth = async (req, res) => {
    const { uid, month, year } = req.query;
  
    try {
      const log = await DailyLog.findOne({ uid });
  
      if (!log) {
        return res.status(200).json([]);
      }
  
      const filteredMoods = log.moods.filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
          entryDate.getMonth() === parseInt(month) && // 0-indexed: Jan = 0
          entryDate.getFullYear() === parseInt(year)
        );
      });
  
      return res.status(200).json(filteredMoods);

    } catch (e) {
      console.log({ error: e });
      return res.status(500).json({ message: 'Failed to fetch daily logs' });
    }
  };
  

  const deleteDaily = async (req, res) => {

    const { uid, date } = req.body;
  
    try {
      const log = await DailyLog.findOne({ uid });
  
      if (!log) {
        return res.status(500).json({ error: 'Daily Log Schema does not exist' });
      }
  
      const targetDateStr = toDateString(date);
  
      // Filter out the moods that don't match the date
      const updatedMoods = log.moods.filter((item) => {
        return toDateString(item.date) !== targetDateStr;
      });
  
      log.moods = updatedMoods;
      await log.save();
  
      return res.status(200).json({ message: 'Daily log deleted successfully' });
  
    } catch (e) {
      console.log({ error: e });
      return res.status(500).json({ message: 'Failed to delete daily log' });
    }
  };
  
  const toDateString = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; //Year-Month-Day
  };
  
  

module.exports = {
  sendMood,
  fetchCurrentMood,
  fetchDailyByMonth,
  deleteDaily
};