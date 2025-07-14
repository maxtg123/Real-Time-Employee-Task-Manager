const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json');


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DB_URL, 
  });
}

const db = admin.firestore();       
const realtimeDB = admin.database();

module.exports = { db, realtimeDB };
