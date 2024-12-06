import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GroupContext from '../context/Groups/GroupContext';
import '../Chatting.css'; // Import CSS for styling

const Chatting = ({ isDarkMode }) => {
    const { groupId } = useParams(); // Extract groupId from the route
    const { getGroupMembers } = useContext(GroupContext);
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [groupMembers, setGroupMembers] = useState([]);

    useEffect(() => {
        const fetchGroupMembers = async () => {
            if (!groupId) {
                console.error("groupId is undefined. Cannot fetch group members.");
                return;
            }

            try {
                console.log("Fetching members for groupId:", groupId);
                const members = await getGroupMembers(groupId);
                if (members) {
                    const totalMembers = members.length;
                    const membersWithStatus = members.map((member, index) => ({
                        id: member._id,
                        name: member.name,
                        status: index < totalMembers / 2 ? 'online' : 'offline',
                    }));
                    setGroupMembers(membersWithStatus);
                }
            } catch (error) {
                console.error("Error fetching group members:", error);
                alert("Failed to load group members.");
            }
        };

        fetchGroupMembers();
    }, [groupId, getGroupMembers]);

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        setMessages([...messages, { sender: "You", text: newMessage }]);
        setNewMessage("");
    };

    return (
        <div className={`chat-container ${isDarkMode ? "dark-mode" : "light-mode"}`}>
            <div className="users-sidebar">
                <h3>Users</h3>
                <ul>
                    {groupMembers.length === 0 ? (
                        <li>No members available</li>
                    ) : (
                        groupMembers.map((member, index) => (
                            <li key={index} className="member-item">
                                <span
                                    className={`status-indicator ${member.status}`}
                                ></span>
                                {member.name || member.id}
                            </li>
                        ))
                    )}
                </ul>
            </div>

            <div className="chat-area">
                <div className="chat-header">
                    <button className="lobby-button" onClick={() => navigate('/groups')}>
                        Lobby
                    </button>
                </div>

                <div className="messages">
                    {messages.length === 0 ? (
                        <p className="no-messages">No messages yet. Start the conversation!</p>
                    ) : (
                        messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender === "You" ? "sent" : "received"}`}>
                                <strong>{msg.sender}:</strong> {msg.text}
                            </div>
                        ))
                    )}
                </div>

                <div className="message-input-container">
                    <textarea
                        className="message-input"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button className="send-button" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default Chatting;
