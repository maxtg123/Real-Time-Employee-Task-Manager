const admin = require("firebase-admin");
const db = admin.firestore();

const getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection("employees").get();
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

module.exports = {
  getAllUsers,
};
