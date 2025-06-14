const express = require('express');
const router = express.Router();
const { createPurchase, getPurchases } = require('../controllers/purchaseController');
const { verifyToken, allowRoles } = require('../middlewares/auth');

router.post('/', verifyToken, allowRoles('Admin', 'LogisticsOfficer'), createPurchase);
router.get('/', verifyToken, getPurchases);

module.exports = router;