import { Link } from "react-router-dom";
import { useState } from "react";
import "./Messages.css";

function Messages() {
  const [selectedChat, setSelectedChat] = useState("CS_Club");

  const chats = [
    {
      id: 1,
      name: "CS_Club",
      lastMessage: "See you at the hackathon!",
      time: "2:30 PM",
    },
    {
      id: 2,
      name: "Art_Lovers",
      lastMessage: "Museum trip this weekend?",
      time: "1:15 PM",
    },
    {
      id: 3,
      name: "Foodies_NYC",
      lastMessage: "Best pizza in Brooklyn 🍕",
      time: "12:45 PM",
    },
    {
      id: 4,
      name: "Book_Club",
      lastMessage: "Finished the chapter yet?",
      time: "Yesterday",
    },
    {
      id: 5,
      name: "Fitness_Gang",
      lastMessage: "Morning run tomorrow?",
      time: "Yesterday",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Alex",
      text: "Hey everyone! Ready for the project?",
      time: "2:15 PM",
      isMe: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Definitely! What time are we meeting?",
      time: "2:20 PM",
      isMe: true,
    },
    {
      id: 3,
      sender: "Jordan",
      text: "How about 3 PM at the library?",
      time: "2:25 PM",
      isMe: false,
    },
    {
      id: 4,
      sender: "You",
      text: "Perfect! See you there 👍",
      time: "2:30 PM",
      isMe: true,
    },
  ];

  return (
    <div className="messages-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <Link to="/home" className="back-button">
            ← Back to Main Page
          </Link>
        </div>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search chats..."
            className="chat-search"
          />
        </div>

        <div className="chats-list">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`chat-item ${
                selectedChat === chat.name ? "active" : ""
              }`}
              onClick={() => setSelectedChat(chat.name)}
            >
              <div className="chat-avatar">{chat.name[0]}</div>
              <div className="chat-info">
                <h4>{chat.name}</h4>
                <p className="last-message">{chat.lastMessage}</p>
              </div>
              <span className="chat-time">{chat.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar-large">{selectedChat[0]}</div>
            <h3>{selectedChat}</h3>
          </div>
        </div>

        <div className="messages-area">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message-bubble ${
                message.isMe ? "my-message" : "their-message"
              }`}
            >
              {!message.isMe && (
                <strong className="sender-name">{message.sender}</strong>
              )}
              <p>{message.text}</p>
              <span className="message-time">{message.time}</span>
            </div>
          ))}
        </div>

        <div className="message-input-container">
          <input
            type="text"
            placeholder="Chat here..."
            className="message-input"
          />
          <button className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Messages;
