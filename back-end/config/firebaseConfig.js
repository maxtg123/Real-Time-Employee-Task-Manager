// config/firebaseConfig.js
const admin = require("firebase-admin");
const path = require("path");
require("dotenv").config();

const serviceAccount = require(path.resolve(__dirname, "../firebaseServiceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL, 
});

const db = admin.firestore();

module.exports = { admin, db };
