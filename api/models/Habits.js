const mongoose = require('mongoose');

const habitLog = new mongoose.Schema({
    date: Date,
    amount_completed: Number,
    reward_claimed: { type: Boolean, default: false}
})

const habit = new mongoose.Schema({
    name: String,
    type: String,
    motivator: String,
    icon: String,
    amount_required: Number,
    reward_amount: Number,
    reward_tier: Number,
    availability: String,
    num_claimed: { type: Number, default: 0},
    date_created: { type: Date, default: Date.now },
    habit_logs: [habitLog]
});

const habits = new mongoose.Schema({
    uid: Number,
    habits: [habit]
})

const Habit = mongoose.model('Habit', habits);

module.exports = Habit;