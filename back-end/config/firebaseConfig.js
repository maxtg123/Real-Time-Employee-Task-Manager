const admin = require("firebase-admin");
const path = require("path");
require("dotenv").config();

// Đường dẫn tới file service account
const serviceAccountPath = path.resolve(__dirname, "../firebaseServiceAccountKey.json");

// Kiểm tra xem file có tồn tại hay không
let serviceAccount = null;
try {
  serviceAccount = require(serviceAccountPath);
} catch (error) {
  console.error(" Missing firebaseServiceAccountKey.json. Please add it.");
  process.exit(1);
}

// Khởi tạo Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL, // dùng cho Realtime Database
});

// Kết nối Firestore (hoặc bạn có thể dùng admin.database() nếu là Realtime DB)
const firestore = admin.firestore();
const realtimeDB = admin.database(); // Nếu bạn cần Realtime Database

module.exports = {
  admin,
  firestore,
  realtimeDB, // chỉ dùng nếu cần
};
