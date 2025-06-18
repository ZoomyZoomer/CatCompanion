const express = require('express')
const { sendMood, fetchCurrentMood, fetchDailyByMonth, deleteDaily, fetchMoodStatus, fetchHighestRatedItems } = require('../controllers/dailyController');

const router = express.Router();

router.post('/sendMood', sendMood);
router.post('/deleteDaily', deleteDaily);

router.get('/fetchCurrentMood', fetchCurrentMood);
router.get('/fetchDailyByMonth', fetchDailyByMonth);
router.get('/fetchHighestRatedItems', fetchHighestRatedItems);


module.exports = router;