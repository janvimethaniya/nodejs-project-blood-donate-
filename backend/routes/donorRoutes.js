const express = require('express');
const router = express.Router();
const {
  registerDonor,
  getAllDonors,
  getDonorsByBloodGroup,
  getDonorProfile,
  updateLastDonation,
  deactivateDonor
} = require('../controllers/donorController');
const { auth } = require('../middleware/auth');

router.post('/register', auth, registerDonor);
router.get('/all', getAllDonors);
router.get('/search', getDonorsByBloodGroup);
router.get('/profile', auth, getDonorProfile);
router.put('/update-donation', auth, updateLastDonation);
router.put('/deactivate', auth, deactivateDonor);

module.exports = router;
