const express = require('express')
const { sendHabit, fetchHabits } = require('../controllers/habitController');

const router = express.Router();

router.post('/sendHabit', sendHabit);

router.get('/fetchHabits', fetchHabits);

module.exports = router;