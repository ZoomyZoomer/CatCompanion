const DailyLog = require('../models/DailyLog.js');

function isSameDay(date1, date2) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

const sendMood = async (req, res) => {

    const {uid, mood, selectedItems, ratings, selectedImage, caption} = req.body;

    try {

        let log = await DailyLog.findOne({ uid });

        if (!log){
            
            await DailyLog.create({
                uid,
                moods: []
            });

            return res.status(500).json({message: 'DailyLog Schema not found'});
        }

        const relLog = log.moods.find((item) => isSameDay(item.date, new Date()));

        if (relLog){

            relLog.mood = mood;
            relLog.logItems = [{item: selectedItems[0], rating: ratings[0]}, {item: selectedItems[1], rating: ratings[1]}, {item: selectedItems[2], rating: ratings[2]}];
            relLog.imageUri = selectedImage;
            relLog.caption = caption;

            await log.save();

            return res.status(200).json({message: 'Log successfully updated'});

        }

        log.moods.push({
            date: new Date(), 
            mood, 
            logItems: [{item: selectedItems[0], rating: ratings[0]}, {item: selectedItems[1], rating: ratings[1]}, {item: selectedItems[2], rating: ratings[2]}], 
            imageUri: selectedImage, 
            caption
        })

        await log.save();

        return res.status(200).json({message: 'Log successfully created'});

    } catch(e) {
        console.log({error: e});
        return res.status(500);
    }

}

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

module.exports = {
  sendMood,
  fetchCurrentMood
};