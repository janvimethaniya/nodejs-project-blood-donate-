const Donor = require('../models/Donor');
const User = require('../models/User');

// Register as donor
exports.registerDonor = async (req, res) => {
  try {
    const { name, bloodGroup, age, gender, city, state, phone, email } = req.body;
    
    // Check if donor exists
    let donor = await Donor.findOne({ email });
    if (donor) {
      return res.status(400).json({ message: 'Donor already registered' });
    }
    
    donor = new Donor({
      userId: req.user.id,
      name,
      bloodGroup,
      age,
      gender,
      city,
      state,
      phone,
      email
    });
    
    await donor.save();
    res.status(201).json({
      message: 'Donor registered successfully',
      donor
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all donors
exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find({ isActive: true });
    res.json({ donors });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get donors by blood group
exports.getDonorsByBloodGroup = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;
    let query = { isActive: true, bloodGroup };
    
    if (city) {
      query.city = city;
    }
    
    const donors = await Donor.find(query);
    res.json({ donors });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get donor profile
exports.getDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user.id });
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json({ donor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update donation date
exports.updateLastDonation = async (req, res) => {
  try {
    const donor = await Donor.findOneAndUpdate(
      { userId: req.user.id },
      { lastDonationDate: new Date() },
      { new: true }
    );
    
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    
    res.json({
      message: 'Donation date updated',
      donor
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Deactivate donor
exports.deactivateDonor = async (req, res) => {
  try {
    const donor = await Donor.findOneAndUpdate(
      { userId: req.user.id },
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
