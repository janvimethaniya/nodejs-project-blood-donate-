const User = require('../models/User');
const Donor = require('../models/Donor');
const BloodRequest = require('../models/BloodRequest');

// Get dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalDonors = await Donor.countDocuments({ isActive: true });
    const totalRequests = await BloodRequest.countDocuments();
    const pendingRequests = await BloodRequest.countDocuments({ status: 'Pending' });
    const approvedRequests = await BloodRequest.countDocuments({ status: 'Approved' });
    const totalUsers = await User.countDocuments();
    res.json({
      totalDonors,
      totalRequests,
      pendingRequests,
      approvedRequests,
      totalUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all donors (admin view)
exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().populate('userId', 'email name phone');
    res.json({ donors });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all blood requests (admin view)
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ requestDate: -1 });
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Approve blood request
exports.approveRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'Approved' },
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    res.json({
      message: 'Request approved',
      request
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Reject blood request
exports.rejectRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'Rejected' },
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    res.json({
      message: 'Request rejected',
      request
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mark request as fulfilled
exports.markFulfilled = async (req, res) => {
  try {
    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'Fulfilled' },
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    res.json({
      message: 'Request marked as fulfilled',
      request
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Deactivate donor
exports.deactivateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    
    res.json({
      message: 'Donor deactivated',
      donor
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get statistics by blood group
exports.getBloodGroupStats = async (req, res) => {
  try {
    const stats = await Donor.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$bloodGroup', count: { $sum: 1 } } }
    ]);
    
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
