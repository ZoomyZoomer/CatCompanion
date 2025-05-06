const express = require('express')
const { sendMood, fetchCurrentMood, fetchDailyByMonth, deleteDaily } = require('../controllers/dailyController');

const router = express.Router();

router.post('/sendMood', sendMood);
router.post('/deleteDaily', deleteDaily);

router.get('/fetchCurrentMood', fetchCurrentMood);
router.get('/fetchDailyByMonth', fetchDailyByMonth);

module.exports = router;