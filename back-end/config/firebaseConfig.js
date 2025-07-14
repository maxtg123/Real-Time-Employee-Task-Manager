const admin = require("firebase-admin");
const path = require("path");
require("dotenv").config();


const serviceAccountPath = path.resolve(__dirname, "../firebaseServiceAccountKey.json");


let serviceAccount = null;
try {
  serviceAccount = require(serviceAccountPath);
} catch (error) {
  console.error(" Missing firebaseServiceAccountKey.json. Please add it.");
  process.exit(1);
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL, 
});


const firestore = admin.firestore();
const realtimeDB = admin.database(); 

module.exports = {
  admin,
  firestore,
  realtimeDB, 
};
