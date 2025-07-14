const express = require('express');
const router = express.Router();
const { createEmployee, getEmployees, deleteEmployee , updateEmployee,} = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/create', authMiddleware, roleMiddleware("admin"), createEmployee);
router.get('/', authMiddleware, roleMiddleware("admin"), getEmployees);
router.post('/delete', authMiddleware, roleMiddleware("admin"), deleteEmployee);
router.post('/update', authMiddleware, roleMiddleware("admin"), updateEmployee);



module.exports = router;
