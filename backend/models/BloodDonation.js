const mongoose = require('mongoose');

const bloodDonationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true
  },
  donorName: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  units: {
    type: Number,
    required: true
  },
  donationDate: {
    type: Date,
    default: Date.now
  },
  location: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Completed'
  },
  notes: String
});

module.exports = mongoose.model('BloodDonation', bloodDonationSchema);
