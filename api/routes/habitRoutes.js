const express = require('express')
const { sendHabit, fetchHabits, recordHabit, deleteHabit } = require('../controllers/habitController');

const router = express.Router();

router.post('/sendHabit', sendHabit);
router.post('/recordHabit', recordHabit);
router.post('/deleteHabit', deleteHabit);

router.get('/fetchHabits', fetchHabits);

module.exports = router;