const mongoose = require('mongoose');

const bloodRequestSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'],
    required: true
  },
  units: {
    type: Number,
    required: true
  },
  hospitalName: {
    type: String,
    required: true
  },
  hospitalAddress: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Emergency'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Fulfilled', 'Rejected'],
    default: 'Pending'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  neededDate: {
    type: Date,
    required: true
  },
  matchedDonors: [{
    donorId: mongoose.Schema.Types.ObjectId,
    donorName: String,
    phone: String
  }]
});

module.exports = mongoose.model('BloodRequest', bloodRequestSchema);
