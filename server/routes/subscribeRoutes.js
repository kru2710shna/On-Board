import express from 'express';
import handleSubscription from '../controllers/subscriptionController.js'
const router = express.Router();
import fetchUser from '../middlewares/fetchUser.js';

router.post('/', fetchUser, handleSubscription);

export default router;