import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import 'bootstrap/dist/css/bootstrap.min.css';

const Subscribe = () => {
    const handleToken = async (token) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/subscribe`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });
            const data = await response.json();

            if (data.success) {
                alert('Payment successful! You are now subscribed to On-Board.');
                localStorage.setItem('isPremiumUser', 'true'); // Mark as premium in localStorage
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during payment:', error);
            alert('An error occurred during the payment process.');
        }
    };

    return (
        <div className="container text-center my-5">
            <h2 className="mb-4">Subscribe to On-Board</h2>
            <p>Subscribe to get unlimited access to the Job ChatBot and more premium features!</p>
            <StripeCheckout
                stripeKey={process.env.REACT_APP_STRIPE_API_KEY} // Your Stripe API Key
                token={handleToken}
                name="On-Board Subscription"
                amount={100} // $50.00 in cents
                currency="USD"
            />
        </div>
    );
};

export default Subscribe;
