const express = require('express')
const { confirmAdventure, fetchCategory } = require('../controllers/adventureController');

const router = express.Router();

router.post('/confirmAdventure', confirmAdventure);
router.get('/fetchCategory/:categoryId', fetchCategory);

module.exports = router;

