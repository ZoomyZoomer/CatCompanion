const express = require('express')
const { sendMood, fetchCurrentMood, fetchDailyByMonth } = require('../controllers/dailyController');

const router = express.Router();

router.post('/sendMood', sendMood);
router.get('/fetchCurrentMood', fetchCurrentMood);
router.get('/fetchDailyByMonth', fetchDailyByMonth);

module.exports = router;