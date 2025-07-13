const { generateAccessCode } = require('../utils/generateCode');
const { sendSMS } = require('../services/smsService');
const { realtimeDB, firestore } = require('../config/firebaseConfig');

const encodePhone = (phone) => phone.replace(/\+/g, '');

const sendPhoneCode = async (req, res) => {
  const { phone } = req.body;

  try {
    const code = generateAccessCode();
    const encodedPhone = encodePhone(phone);

    await realtimeDB.ref(`phoneCodes/${encodedPhone}`).set(code);
    await sendSMS(phone, `Your OTP is: ${code}`);

    return res.status(200).json({ message: 'OTP sent via SMS.' });
  } catch (error) {
    console.error('Error sending phone code:', error.message);
    return res.status(500).json({ message: 'Failed to send SMS OTP.' });
  }
};

const verifyPhoneCode = async (req, res) => {
  const { phone, code } = req.body;

  try {
    const encodedPhone = encodePhone(phone);
    const snapshot = await realtimeDB.ref(`phoneCodes/${encodedPhone}`).once('value');
    const storedCode = snapshot.val();

    if (!storedCode) {
      return res.status(404).json({ message: 'No code found.' });
    }

    if (storedCode !== code) {
      return res.status(400).json({ message: 'Invalid OTP code.' });
    }

    // ✅ Xóa mã sau khi xác thực
    await realtimeDB.ref(`phoneCodes/${encodedPhone}`).remove();

    // 🔍 Tìm user trong Firestore theo phone
    const userSnapshot = await firestore.collection('employees')
      .where('phone', '==', '+' + encodedPhone)
      .limit(1)
      .get();

    if (userSnapshot.empty) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const userDoc = userSnapshot.docs[0];
    const userData = userDoc.data();

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
    });

  } catch (error) {
    console.error('Error verifying phone code:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { sendPhoneCode, verifyPhoneCode };
