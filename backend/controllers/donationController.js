const BloodDonation = require('../models/BloodDonation');
const Donor = require('../models/Donor');

// Record a donation
exports.recordDonation = async (req, res) => {
  try {
    const { donorId, units, location, notes } = req.body;
    
    // Get donor details
    const donor = await Donor.findById(donorId);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    
    const donation = new BloodDonation({
      donorId,
      donorName: donor.name,
      bloodGroup: donor.bloodGroup,
      units,
      location,
      notes
    });
    
    await donation.save();
    
    // Update donor's last donation date
    donor.lastDonationDate = new Date();
    await donor.save();
    
    res.status(201).json({
      message: 'Donation recorded successfully',
      donation
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await BloodDonation.find().sort({ donationDate: -1 });
    res.json({ donations });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get donations by donor
exports.getDonationsByDonor = async (req, res) => {
  try {
    const { donorId } = req.params;
    const donations = await BloodDonation.find({ donorId }).sort({ donationDate: -1 });
    res.json({ donations });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get donor donation statistics
exports.getDonorStats = async (req, res) => {
  try {
    const { donorId } = req.params;
    
    const totalDonations = await BloodDonation.countDocuments({ donorId, status: 'Completed' });
    const totalUnits = await BloodDonation.aggregate([
      { $match: { donorId: mongoose.Types.ObjectId(donorId), status: 'Completed' } },
      { $group: { _id: null, totalUnits: { $sum: '$units' } } }
    ]);
    
    const lastDonation = await BloodDonation.findOne({ donorId, status: 'Completed' })
      .sort({ donationDate: -1 });
    
    res.json({
      totalDonations,
      totalUnits: totalUnits[0]?.totalUnits || 0,
      lastDonation
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get blood donation statistics
exports.getDonationStats = async (req, res) => {
  try {
    const stats = await BloodDonation.aggregate([
      { $match: { status: 'Completed' } },
      { $group: {
          _id: '$bloodGroup',
          totalUnits: { $sum: '$units' },
          donationCount: { $sum: 1 }
        }
      }
    ]);
    
    res.json({ stats });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
