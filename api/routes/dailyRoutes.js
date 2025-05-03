const express = require('express')
const { sendMood, fetchCurrentMood } = require('../controllers/dailyController');

const router = express.Router();

router.post('/sendMood', sendMood);
router.get('/fetchCurrentMood', fetchCurrentMood);

module.exports = router;