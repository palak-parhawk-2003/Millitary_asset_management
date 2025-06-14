const express = require('express');
const router = express.Router();
const { createAssignment, getAssignments } = require('../controllers/assignmentController');
const { verifyToken, allowRoles } = require('../middlewares/auth');

router.post('/', verifyToken, allowRoles('Admin', 'BaseCommander'), createAssignment);
router.get('/', verifyToken, getAssignments);

module.exports = router;
