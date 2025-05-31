const mongoose = require('mongoose');

const habit = new mongoose.Schema({
    name: String,
    type: String,
    motivator: String,
    icon: String,
    amount_required: Number,
    amount_completed: { type: Number, default: 0 },
    reward_amount: Number,
    reward_tier: Number,
    availability: String,
    num_claimed: { type: Number, default: 0 },
    date_created: { type: Date, default: Date.now },
    mostRecentCompletion: { type: Date, default: null},
    isCompletedToday: { type: Boolean, default: false }
});

const habits = new mongoose.Schema({
    uid: Number,
    habits: [habit]
})

const Habit = mongoose.model('Habit', habits);

module.exports = Habit;