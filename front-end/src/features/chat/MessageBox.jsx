import { useState } from "react";
import "./MessageBox.css"; 

const dummyMessages = [
  {
    id: 1,
    name: "Employee 1",
    preview: "Hello",
    messages: ["Hi boss", "Can I ask something?"],
  },
  {
    id: 2,
    name: "Employee 2",
    preview: "Task done",
    messages: ["I've completed the task.", "Let me know if it's OK."],
  },
];

const MessageBox = () => {
  const [selectedId, setSelectedId] = useState(null);
  const selected = dummyMessages.find((msg) => msg.id === selectedId);

  return (
    <div className="message-container">
      {/* Left column */}
      <div className="message-list">
        <h2>Messages</h2>
        {dummyMessages.map((msg) => (
          <div
            key={msg.id}
            className={`message-item ${
              selectedId === msg.id ? "active" : ""
            }`}
            onClick={() => setSelectedId(msg.id)}
          >
            <div className="message-name">{msg.name}</div>
            <div className="message-preview">{msg.preview}</div>
          </div>
        ))}
      </div>

      {/* Right column */}
      <div className="chat-box">
        <div className="chat-content">
          {selected ? (
            selected.messages.map((msg, idx) => (
              <div key={idx} className="chat-message">
                {msg}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Select a message to view chat.</p>
          )}
        </div>
        {selected && (
          <div className="chat-input">
            <input type="text" placeholder="Type your reply..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
