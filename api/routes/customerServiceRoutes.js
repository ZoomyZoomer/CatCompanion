const express = require('express')
const { sendFeedback } = require('../controllers/customerServiceController');

const router = express.Router();

router.post('/sendFeedback', sendFeedback);

module.exports = router;