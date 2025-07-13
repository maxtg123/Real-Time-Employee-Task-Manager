const { sendEmail } = require('../services/mailService');
const { generateAccessCode } = require('../utils/generateCode');
const { realtimeDB, firestore } = require('../config/firebaseConfig'); 

const encodeEmail = (email) => email.replace(/\./g, ',');

const sendAccessCode = async (req, res) => {
  const { email } = req.body;

  try {
    const code = generateAccessCode();
    const encodedEmail = encodeEmail(email);

    await realtimeDB.ref(`accessCodes/${encodedEmail}`).set(code);

    await sendEmail(email, 'Your Access Code', `Your access code is: ${code}`);
    return res.status(200).json({ message: 'Access code sent successfully.' });
  } catch (error) {
    console.error('Error sending access code:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const verifyAccessCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const encodedEmail = encodeEmail(email);
    const snapshot = await realtimeDB.ref(`accessCodes/${encodedEmail}`).once('value');
    const storedCode = snapshot.val();

    if (!storedCode) {
      return res.status(404).json({ message: 'No access code found for this email.' });
    }

    if (storedCode !== code) {
      return res.status(400).json({ message: 'Invalid access code.' });
    }


    await realtimeDB.ref(`accessCodes/${encodedEmail}`).remove();

    // Fetch user data from Firestore
    // Assuming you have a collection named 'employees' where user data is stored
    const userSnapshot = await firestore.collection('employees')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    return res.status(200).json({
      message: 'Access code verified successfully.',
      user: {
        id: userDoc.id,
        name: userData.name,
        email: userData.email,
        role: userData.role, 
      },
    });

  } catch (error) {
    console.error('Error verifying access code:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { sendAccessCode, verifyAccessCode };
