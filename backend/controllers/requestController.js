const BloodRequest = require('../models/BloodRequest');
const Donor = require('../models/Donor');

// Create blood request
exports.createBloodRequest = async (req, res) => {
  try {
    const {
      patientName,
      bloodGroup,
      units,
      hospitalName,
      hospitalAddress,
      city,
      phone,
      email,
      reason,
      urgency,
      neededDate
    } = req.body;
    
    const request = new BloodRequest({
      patientName,
      bloodGroup,
      units,
      hospitalName,
      hospitalAddress,
      city,
      phone,
      email,
      reason,
      urgency,
      neededDate
    });
    
    await request.save();
    
    // Find matching donors
    const matchedDonors = await Donor.find({
      bloodGroup,
      city,
      isActive: true
    }).limit(5);
    
    request.matchedDonors = matchedDonors.map(donor => ({
      donorId: donor._id,
      donorName: donor.name,
      phone: donor.phone
    }));
    
    await request.save();
    
    res.status(201).json({
      message: 'Blood request created successfully',
      request
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all blood requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find().sort({ requestDate: -1 });
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get requests by city
exports.getRequestsByCity = async (req, res) => {
  try {
    const { city } = req.query;
    const requests = await BloodRequest.find({ city }).sort({ requestDate: -1 });
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get pending requests (for admin)
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: 'Pending' }).sort({ urgency: -1 });
    res.json({ requests });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update request status
exports.updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    res.json({
      message: 'Request status updated',
      request
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get request details
exports.getRequestDetails = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    res.json({ request });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
