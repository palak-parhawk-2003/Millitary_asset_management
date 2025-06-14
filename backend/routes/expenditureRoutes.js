const express = require('express');
const router = express.Router();
const { createExpenditure, getExpenditures } = require('../controllers/expenditureController');
const { verifyToken, allowRoles } = require('../middlewares/auth');

router.post('/', verifyToken, allowRoles('Admin', 'BaseCommander'), createExpenditure);
router.get('/', verifyToken, getExpenditures);

module.exports = router;
