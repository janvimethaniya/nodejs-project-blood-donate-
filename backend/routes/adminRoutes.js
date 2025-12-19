const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllDonors,
  getAllRequests,
  approveRequest,
  rejectRequest,
  markFulfilled,
  deactivateDonor,
  getBloodGroupStats
} = require('../controllers/adminController');
const { adminAuth } = require('../middleware/auth');

router.get('/stats', adminAuth, getDashboardStats);
router.get('/donors', adminAuth, getAllDonors);
router.get('/requests', adminAuth, getAllRequests);
router.put('/request/:id/approve', adminAuth, approveRequest);
router.put('/request/:id/reject', adminAuth, rejectRequest);
router.put('/request/:id/fulfilled', adminAuth, markFulfilled);
router.put('/donor/:id/deactivate', adminAuth, deactivateDonor);
router.get('/blood-group-stats', adminAuth, getBloodGroupStats);

module.exports = router;
