const express = require('express');
const router = express.Router();
const { getDashboardMetrics } = require('../controllers/dashboardController');
const { verifyToken } = require('../middlewares/auth');

router.get('/metrics', verifyToken, getDashboardMetrics);

module.exports = router;