import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ChatBot = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleChat = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/chat/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userInput }),
            });
    
            if (!response.ok) {
                // Handle HTTP errors (e.g., 500 Internal Server Error)
                const errorData = await response.json();
                console.error("Server Error:", errorData.error);
                setChatHistory([...chatHistory, { user: userInput, bot: "Sorry, there was an issue processing your request." }]);
                setUserInput('');
                return;
            }
    
            const data = await response.json();
            
            // Check if botResponse exists in data
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
