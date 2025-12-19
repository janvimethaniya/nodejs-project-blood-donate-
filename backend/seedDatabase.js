const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blood-donation');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB error:', error.message);
    process.exit(1);
  }
};

const User = require('./models/User');
const Donor = require('./models/Donor');

const seedDonors = async () => {
  await connectDB();

  try {
    // clear 
    await User.deleteMany({});
    await Donor.deleteMany({});
    console.log('✅ Old data cleared');
    // Users create
    const users = await User.create([
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        password: '12345678',
        phone: '9876543210',
        role: 'donor'
      },
      {
        name: 'Priya Sharma',
        email: 'priya@example.com',
        password: '12345678',
        phone: '9123456789',
        role: 'donor'
      },
      {
        name: 'Amit Patel',
        email: 'amit@example.com',
        password: '12345678',
        phone: '9876543211',
        role: 'donor'
      },
      {
        name: 'Sneha Desai',
        email: 'sneha@example.com',
        password: '12345678',
        phone: '9876543212',
        role: 'donor'
      },
      {
        name: 'Vikram Singh',
        email: 'vikram@example.com',
        password: '12345678',
        phone: '9876543213',
        role: 'donor'
      }
    ]);

    console.log(`✅ ${users.length} Users created`);
//ب Donors create 
    const donors = await Donor.create([
      {
        userId: users[0]._id,
        name: 'Rajesh Kumar',
        bloodGroup: 'O+',
        age: 25,
        gender: 'Male',
        city: 'Ahmedabad',
        state: 'Gujarat',
        phone: '9876543210',
        email: 'rajesh@example.com'
      },
      {
        userId: users[1]._id,
        name: 'Priya Sharma',
        bloodGroup: 'A+',
        age: 28,
        gender: 'Female',
        city: 'Mumbai',
        state: 'Maharashtra',
        phone: '9123456789',
        email: 'priya@example.com'
      },
      {
        userId: users[2]._id,
        name: 'Amit Patel',
        bloodGroup: 'B+',
        age: 32,
        gender: 'Male',
        city: 'Bangalore',
        state: 'Karnataka',
        phone: '9876543211',
        email: 'amit@example.com'
      },
      {
        userId: users[3]._id,
        name: 'Sneha Desai',
        bloodGroup: 'AB+',
        age: 24,
        gender: 'Female',
        city: 'Pune',
        state: 'Maharashtra',
        phone: '9876543212',
        email: 'sneha@example.com'
      },
      {
        userId: users[4]._id,
        name: 'Vikram Singh',
        bloodGroup: 'O-',
        age: 35,
        gender: 'Male',
        city: 'Delhi',
        state: 'Delhi',
        phone: '9876543213',
        email: 'vikram@example.com'
      }
    ]);

    console.log(`✅ ${donors.length} Donors created`);
    console.log('✅ Database seeding complete!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedDonors();
