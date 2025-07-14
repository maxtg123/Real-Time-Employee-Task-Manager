const { generateAccessCode } = require('../utils/generateCode');
const { sendSMS } = require('../services/smsService');
const { firestore } = require('../config/firebaseConfig');

const encodePhone = (phone) => phone.replace(/\+/g, '');

const sendPhoneCode = async (req, res) => {
  const { phone } = req.body;

  try {
    const code = generateAccessCode();
    const encodedPhone = encodePhone(phone);

    const userSnapshot = await firestore.collection('employees')
      .where('phone', '==', '+' + encodedPhone)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userDoc = userSnapshot.docs[0];
    await userDoc.ref.update({ accessCode: code });

    
    
    console.log(`[DEBUG] OTP for ${phone}: ${code}`);

    return res.status(200).json({ message: 'OTP sent via SMS.' });

  } catch (error) {
    console.error('Error sending phone code:', error.message);
    return res.status(500).json({ message: 'Failed to send SMS OTP.' });
  }
};

const jwt = require('jsonwebtoken');

const verifyPhoneCode = async (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res.status(400).json({ message: 'Phone and code are required.' });
  }

  try {
    const encodedPhone = encodePhone(phone);

    if (!storedCode) {
      return res.status(404).json({ message: 'No code found.' });
    }

    if (storedCode !== code) {
      return res.status(400).json({ message: 'Invalid OTP code.' });
    }

   
    await realtimeDB.ref(`phoneCodes/${encodedPhone}`).remove();

    
    const userSnapshot = await firestore.collection('employees')
      .where('phone', '==', '+' + encodedPhone)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

    if (userData.accessCode !== code) {
      return res.status(400).json({ message: 'Invalid OTP code.' });
    }

    await userDoc.ref.update({ accessCode: '' });

    const token = jwt.sign(
      { id: userDoc.id, phone: userData.phone, role: userData.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Phone verified successfully.',
      user: {
        id: userDoc.id,
        name: userData.name,
        email: userData.email || null,
        phone: userData.phone,
        role: userData.role || 'user',
        address: userData.address || '',
      },
      token,
    });

  } catch (error) {
    console.error('Error verifying phone code:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = { sendPhoneCode, verifyPhoneCode };
