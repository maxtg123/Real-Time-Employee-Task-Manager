import { useEffect, useState } from "react";
import {
  connectSocket,
  disconnectSocket,
  sendMessage,
  onReceiveMessage,
  offReceiveMessage,
} from "./chatApi";
import { getUser } from "../../utils/storage";
import { fetchAllUsers } from "./chatApi";
import "./MessageBox.css";

const MessageBox = () => {
  const currentUser = getUser(); 
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [chatData, setChatData] = useState({});
  const [inputText, setInputText] = useState("");

  const selected = users.find((user) => user.id === selectedId);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const allUsers = await fetchAllUsers();
      const filtered = allUsers.filter((u) => u.id !== currentUser.id);
      setUsers(filtered);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  fetchUsers();
  connectSocket();

  onReceiveMessage(({ from, to, message }) => {
    const partnerId = from === currentUser.id ? to : from;
    setChatData((prev) => ({
      ...prev,
      [partnerId]: [...(prev[partnerId] || []), { from, text: message }],
    }));
  });

  return () => {
    offReceiveMessage();
    disconnectSocket();
  };
}, [currentUser.id]);

  const handleSend = () => {
    if (!selectedId || !inputText.trim()) return;

    const message = inputText.trim();

    sendMessage({
      from: currentUser.id,
      to: selectedId,
      message,
    });

    setChatData((prev) => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), { from: currentUser.id, text: message }],
    }));

    setInputText("");
  };

  return (
    <div className="message-container">
      {/* Left column: user list */}
      <div className="message-list">
        <h2>Messages</h2>
        {users.map((user) => (
          <div
            key={user.id}
            className={`message-item ${selectedId === user.id ? "active" : ""}`}
            onClick={() => setSelectedId(user.id)}
          >
            <div className="message-name">{user.name || user.email || user.phone}</div>
            <div className="message-preview">
              {(chatData[user.id] || []).slice(-1)[0]?.text || "No messages"}
            </div>
          </div>
        ))}
      </div>

      {/* Right column: chat window */}
      <div className="chat-box">
        <div className="chat-content">
          {selected ? (
           (chatData[selectedId] || []).map((msg, idx) => {
  console.log("msg.from:", msg.from, "currentUser.id:", currentUser.id);
  return (
    <div
      key={idx}
      className={`chat-message ${msg.from === currentUser.id ? "me" : "them"}`}
    >
      {msg.text}
    </div>
  );
})
          ) : (
            <p className="text-gray-500">Select a conversation</p>
          )}
        </div>
        {selected && (
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your reply..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
