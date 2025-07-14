import { io } from "socket.io-client";
import { getUser } from "../../utils/storage";
import axios from "axios";


const user = getUser();
console.log("🔍 currentUser:", user);

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  autoConnect: false,
});


export const connectSocket = () => {
  const user = getUser();
  if (!user) return;

  socket.connect();
  socket.emit("register_user", user.id); 
};

// Ngắt kết nối socket
export const disconnectSocket = () => {
  socket.disconnect();
};


export const sendMessage = ({ from, to, message }) => {
  socket.emit("send_message", { from, to, message });
};


export const onReceiveMessage = (callback) => {
  socket.on("receive_message", callback);
};


export const offReceiveMessage = () => {
  socket.off("receive_message");
};


export const fetchMessages = async (userId) => {
  return axios.get(`/api/messages/${userId}`); 
};

export const fetchAllUsers = async () => {
  const user = getUser();
  const res = await axios.get("http://localhost:5000/api/users", {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return res.data;
};
