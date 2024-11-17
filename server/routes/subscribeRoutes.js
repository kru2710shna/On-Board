const express = require('express');
const { handleSubscription } = require('../controllers/subscriptionController');
const router = express.Router();

router.post('/', handleSubscription);

module.exports = router;