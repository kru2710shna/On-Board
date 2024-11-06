import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatBot = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isPremium, setIsPremium] = useState(false); // Handle premium state
    const [isTrialActive, setIsTrialActive] = useState(false); // Handle trial state
    const [trialStartTime, setTrialStartTime] = useState(null); // Record trial start time
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPremiumStatus = async () => {
            const token = localStorage.getItem('auth_token'); // Get the auth token
            if (!token) {
                console.error('No auth token found');
                return;
            }
            
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user/premium-status`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}` // Send token in the Authorization header
                    }
                });
    
                const data = await response.json();
                console.log("Premium Status Response:", data); // Log the response for debugging
    
                if (response.ok) {
                    setIsPremium(data.isPremiumUser); // Set premium status
                } else {
                    console.error('Error fetching premium status:', data.error);
                }
            } catch (error) {
                console.error("Error fetching premium status:", error);
            }
        };
    
        fetchPremiumStatus();
        
        const trialTime = localStorage.getItem('trialStartTime');
        if (trialTime) {
            setTrialStartTime(new Date(trialTime));
            setIsTrialActive(true);
        }
        
        // Check trial expiration
        if (isTrialActive && trialStartTime) {
            const now = Date.now();
            const timeElapsed = (now - trialStartTime.getTime()) / (60 * 1000); // Time in minutes
            if (timeElapsed >= 20) {
                alert('Your free trial has expired. Please subscribe to continue using the ChatBot.');
                setIsTrialActive(false); // Deactivate trial after 20 minutes
                localStorage.removeItem('trialStartTime');
            }
        }
    }, [isTrialActive, trialStartTime]);

    const startFreeTrial = () => {
        setIsTrialActive(true);
        const startTime = Date.now();
        setTrialStartTime(new Date(startTime));
        localStorage.setItem('trialStartTime', startTime); // Store trial start time in localStorage
    };

    const handleSubscription = () => {
        navigate('/subscribe'); // Redirect to the Subscribe page
    };

    const handleChat = async () => {
        const token = localStorage.getItem('auth_token'); // Ensure the auth token is being retrieved
    
        if (!isPremium && !isTrialActive) {
            alert("You must subscribe or start a free trial to use the ChatBot.");
            return;
        }
    
        if (!token) {
            alert('User is not authenticated. Please log in again.');
            return;
        }
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/chat/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Send the token in the Authorization header
                },
                body: JSON.stringify({ userInput }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Server Error:", errorData.error);
                setChatHistory([...chatHistory, { user: userInput, bot: "Sorry, there was an issue processing your request." }]);
                setUserInput('');
                return;
            }
    
            const data = await response.json();
            const botResponse = data.botResponse ? data.botResponse.replace(/\n/g, "<br />") : "No response available";
            setChatHistory([...chatHistory, { user: userInput, bot: botResponse }]);
            setUserInput('');
        } catch (error) {
            console.error("Error in chat request:", error);
            setChatHistory([...chatHistory, { user: userInput, bot: "An error occurred while trying to get a response." }]);
            setUserInput('');
        }
    };


    if (!isPremium && !isTrialActive) {
        return (
            <div className="container text-center my-5">
                <h2 className="mb-4">Job ChatBot - Premium Feature</h2>
                <p>This is a premium feature. To unlock the full ChatBot functionality, please subscribe to On-Board or start a free trial.</p>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary mx-2" onClick={handleSubscription}>Subscribe to On-Board</button>
                    <button className="btn btn-secondary mx-2" onClick={startFreeTrial}>Start Free Trial (20 mins)</button>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <h2 className="text-center">Job ChatBot</h2>
            <div className="chat-history mb-4">
                {chatHistory.map((chat, index) => (
                    <div key={index}>
                        <div className="d-flex justify-content-end mb-2">
                            <div className="card text-white bg-primary w-75">
                                <div className="card-body">
                                    <p className="mb-0"><strong>You:</strong> {chat.user}</p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-start mb-2">
                            <div className="card text-dark bg-light w-75">
                                <div className="card-body">
                                    <p className="mb-0" dangerouslySetInnerHTML={{ __html: chat.bot }}></p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask about jobs, requirements, or job market"
                />
                <button className="btn btn-primary" onClick={handleChat}>Send</button>
            </div>
        </div>
    );
};

export default ChatBot;
