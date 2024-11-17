import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatBot = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [isPremium] = useState(localStorage.getItem('isPremiumUser') === 'true');
    const [isTrialActive, setIsTrialActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
    const navigate = useNavigate();

    useEffect(() => {
        if (isTrialActive && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            alert("Your free trial has ended. Please subscribe to continue.");
            setIsTrialActive(false);
        }
    }, [isTrialActive, timeLeft]);

    const handleSubscriptionChoice = (choice) => {
        if (choice === 'premium') {
            navigate('/Subscribe'); 
        } else if (choice === 'trial') {
            setIsTrialActive(true);
        }
    };

    const handleChat = async () => {
        if (!isPremium && !isTrialActive) {
            alert("This is a premium feature. Please start a free trial or subscribe.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/chat/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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

    return (
        <div className="container my-4">
            {!isPremium && !isTrialActive ? (
                <div className="text-center">
                    <h2 className="mb-3">This is a premium feature. You need a subscription to chat with the On-Board Bot.</h2>
                    <p>Do you have a premium membership or would you like to start a free trial?</p>
                    <button className="btn btn-primary me-2" onClick={() => handleSubscriptionChoice('premium')}>Premium Feature</button>
                    <button className="btn btn-secondary" onClick={() => handleSubscriptionChoice('trial')}>Start Free Trial</button>
                </div>
            ) : (
                <div>
                    {isTrialActive && <p>Free trial time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>}
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
            )}
        </div>
    );
};

export default ChatBot;
