const express = require('express');
const router = express.Router();
const { createTransfer, getTransfers } = require('../controllers/transferController');
const { verifyToken, allowRoles } = require('../middlewares/auth');

router.post('/', verifyToken, allowRoles('Admin', 'LogisticsOfficer'), createTransfer);
router.get('/', verifyToken, getTransfers);

module.exports = router;
