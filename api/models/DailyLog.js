const mongoose = require('mongoose');

const logItem = new mongoose.Schema({
    date: Date,
    mood: String,
    logItems: [{item: mongoose.Schema.Types.Mixed, rating: Number}],
    imageUri: String,
    caption: String
})

const dailyLog = new mongoose.Schema({
    uid: Number,
    moods: [logItem]
})

const DailyLog = mongoose.model('DailyLog', dailyLog);

module.exports = DailyLog;