const mongoose = require('mongoose');

const feedbackItem = new mongoose.Schema({
    subject: String,
    feedback: String,
    date: Date
})

const feedback = new mongoose.Schema({
    uid: Number,
    feedbackItem: [feedbackItem]
})

const Feedback = mongoose.model('Feedback', feedback);

module.exports = Feedback;