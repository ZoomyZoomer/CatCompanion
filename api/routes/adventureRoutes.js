const express = require('express')
const { confirmAdventure, fetchCategory, fetchActiveAdventure } = require('../controllers/adventureController');

const router = express.Router();

router.post('/confirmAdventure', confirmAdventure);
router.get('/fetchCategory', fetchCategory);
router.get('/fetchActiveAdventure', fetchActiveAdventure);

module.exports = router;

