const express = require('express');
const router = express.Router();
const {
  recordDonation,
  getAllDonations,
  getDonationsByDonor,
  getDonorStats,
  getDonationStats
} = require('../controllers/donationController');
const { auth, adminAuth } = require('../middleware/auth');

router.post('/record', adminAuth, recordDonation);
router.get('/all', adminAuth, getAllDonations);
router.get('/donor/:donorId', getDonationsByDonor);
router.get('/stats/donor/:donorId', getDonorStats);
router.get('/stats', adminAuth, getDonationStats);

module.exports = router;
