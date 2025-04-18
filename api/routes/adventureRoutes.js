const express = require('express')
const { confirmAdventure, fetchCategory } = require('../controllers/adventureController');

const router = express.Router();

router.post('/confirmAdventure', confirmAdventure);
router.get('/fetchCategory', fetchCategory);

module.exports = router;

