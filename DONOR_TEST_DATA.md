// Test Donors data کو manually add کرنے کے لیے یہ script استعمال کریں
// MongoDB Compass یا Postman میں استعمال کریں

// پہلے User register کریں (API call)
// POST http://localhost:1000/api/auth/register
{
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "password": "12345678",
  "phone": "9876543210",
  "role": "donor"
}

// Response سے userId اور token ملے گا

// پھر Donor Register کریں (Authorization header میں token ڈالیں)
// POST http://localhost:1000/api/donors/register
{
  "name": "Rajesh Kumar",
  "bloodGroup": "O+",
  "age": 25,
  "gender": "Male",
  "city": "Ahmedabad",
  "state": "Gujarat",
  "phone": "9876543210",
  "email": "rajesh@example.com"
}

// اسی طرح اور donors add کریں...

// Test Donors Data:
Test Donor 1:
{
  "name": "Priya Sharma",
  "bloodGroup": "A+",
  "age": 28,
  "gender": "Female",
  "city": "Mumbai",
  "state": "Maharashtra",
  "phone": "9123456789",
  "email": "priya@example.com"
}

Test Donor 2:
{
  "name": "Amit Patel",
  "bloodGroup": "B+",
  "age": 32,
  "gender": "Male",
  "city": "Bangalore",
  "state": "Karnataka",
  "phone": "9876543211",
  "email": "amit@example.com"
}

Test Donor 3:
{
  "name": "Sneha Desai",
  "bloodGroup": "AB+",
  "age": 24,
  "gender": "Female",
  "city": "Pune",
  "state": "Maharashtra",
  "phone": "9876543212",
  "email": "sneha@example.com"
}

Test Donor 4:
{
  "name": "Vikram Singh",
  "bloodGroup": "O-",
  "age": 35,
  "gender": "Male",
  "city": "Delhi",
  "state": "Delhi",
  "phone": "9876543213",
  "email": "vikram@example.com"
}
