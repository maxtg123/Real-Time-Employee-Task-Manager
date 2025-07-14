const admin = require('firebase-admin');

exports.createEmployee = async (req, res) => {
  try {
    const { name, phone, email, role, address } = req.body;

    if (!name || !phone || !email || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newEmployee = {
      name,
      phone,
      email,
      role,
      address: address || '',
      createdAt: new Date().toISOString(),
    };

    const docRef = await admin.firestore().collection('employees').add(newEmployee);

    return res.status(201).json({
      success: true,
      employeeId: docRef.id,
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const snapshot = await admin.firestore().collection('employees').get();
    const employees = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { employeeId } = req.body;

  if (!employeeId) {
    return res.status(400).json({ error: "Missing employee ID" });
  }

  try {
    await admin.firestore().collection("employees").doc(employeeId).delete();
    res.status(200).json({ success: true, message: "Employee deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

exports.updateEmployee = async (req, res) => {
  const { employeeId, name, email, phone, role, address } = req.body;

  if (!employeeId) {
    return res.status(400).json({ error: "Missing employee ID" });
  }

  try {
    await admin.firestore().collection("employees").doc(employeeId).update({
      name,
      email,
      phone,
      role,
      address,
      updatedAt: new Date().toISOString(),
    });

    res.status(200).json({ success: true, message: "Employee updated" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update employee" });
  }
};

