const { firestore } = require('../config/firebaseConfig'); // ✅

const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, role, address } = req.body;

    const newEmployee = {
      name,
      email,
      phone,
      role: role || 'user',
      address,
      status: 'active',
    };

    const docRef = await firestore.collection('employees').add(newEmployee);
    res.status(201).json({ id: docRef.id, ...newEmployee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const snapshot = await db.collection('employees').get();
    const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createEmployee,
  getEmployees
};
