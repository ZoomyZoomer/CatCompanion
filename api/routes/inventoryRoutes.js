const express = require('express')
const { fetchItem, useItem } = require('../controllers/inventoryController');

const router = express.Router();

router.post('/useItem', useItem);

router.get('/fetchItem', fetchItem);

module.exports = router;