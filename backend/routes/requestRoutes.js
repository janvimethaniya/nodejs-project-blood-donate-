const express = require('express');
const router = express.Router();
const {
  createBloodRequest,
  getAllRequests,
  getRequestsByCity,
  getPendingRequests,
  updateRequestStatus,
  getRequestDetails
} = require('../controllers/requestController');
const { auth } = require('../middleware/auth');

router.post('/create', createBloodRequest);
router.get('/all', getAllRequests);
router.get('/city', getRequestsByCity);
router.get('/pending', getPendingRequests);
router.get('/:id', getRequestDetails);
router.put('/:id/status', auth, updateRequestStatus);

module.exports = router;
