const User = require('../models/User');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const handleSubscription = async (req, res) => {
    const { token } = req.body;
    const userId = req.user.id; // Assuming you have user authentication

    try {
        const charge = await stripe.charges.create({
            amount: 5000, // $50.00 subscription fee
            currency: 'usd',
            description: 'On-Board Premium Subscription',
            source: token.id,
        });

        if (charge.status === 'succeeded') {
            const user = await User.findById(userId);
            user.isPremiumUser = true;
            await user.save();
            res.json({ success: true, message: 'Subscription successful!' });
        } else {
            res.status(400).json({ success: false, message: 'Payment failed.' });
        }
    } catch (error) {
        console.error('Error with Stripe:', error);
        res.status(500).json({ success: false, message: 'An error occurred with payment processing.' });
    }
};

module.exports = { handleSubscription };
