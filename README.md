# Blood Donation Website

A complete MERN (MongoDB, Express, React, Node.js) stack application for managing blood donations.

## Project Structure

```
project6/
├── backend/
│   ├── models/          # MongoDB models (User, Donor, BloodRequest)
│   ├── controllers/     # Business logic
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── server.js        # Express server
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API calls
│   │   ├── pages/       # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── .env
└── README.md
```

## Features

### 👤 Users (Donors, Patients, Hospitals)
- Register and login
- For Donors: Register as blood donor, view their profile, update last donation
- For Patients: Request blood, search for donors, track requests
- For Hospitals: Manage multiple requests, view matching donors

### 👨‍💼 Admin
- View dashboard with statistics
- Manage donors (view, deactivate)
- Manage blood requests (approve, reject, mark fulfilled)
- View blood group statistics
- Send emergency alerts

## Installation

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Make sure MongoDB is running on your system

4. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

The frontend will open on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Donors
- `POST /api/donors/register` - Register as donor
- `GET /api/donors/all` - Get all donors
- `GET /api/donors/search` - Search donors by blood group and city
- `GET /api/donors/profile` - Get donor profile
- `PUT /api/donors/update-donation` - Update last donation date
- `PUT /api/donors/deactivate` - Deactivate donor account

### Blood Requests
- `POST /api/requests/create` - Create blood request
- `GET /api/requests/all` - Get all requests
- `GET /api/requests/city` - Get requests by city
- `GET /api/requests/pending` - Get pending requests
- `GET /api/requests/:id` - Get request details
- `PUT /api/requests/:id/status` - Update request status

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/donors` - Get all donors
- `GET /api/admin/requests` - Get all requests
- `PUT /api/admin/request/:id/approve` - Approve request
- `PUT /api/admin/request/:id/reject` - Reject request
- `PUT /api/admin/request/:id/fulfilled` - Mark as fulfilled
- `PUT /api/admin/donor/:id/deactivate` - Deactivate donor
- `GET /api/admin/blood-group-stats` - Get blood group statistics

## Technology Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs (Password hashing)

### Frontend
- React 18
- React Router v6
- Axios
- CSS3

## User Roles

1. **Donor** - Register to donate blood
2. **Patient** - Request blood for medical needs
3. **Hospital** - Manage blood requests for patients
4. **Admin** - Manage entire system, approve requests, manage donors

## Database Models

### User
- name, email, password, phone, role

### Donor
- userId (reference to User)
- name, bloodGroup, age, gender, city, state, phone, email
- lastDonationDate, isActive

### BloodRequest
- patientName, bloodGroup, units, hospitalName, hospitalAddress
- city, phone, email, reason, urgency, status
- requestDate, neededDate, matchedDonors

## How to Use

1. Go to `http://localhost:3000`
2. Register as a donor, patient, or hospital
3. For Donors: Complete donor profile and wait for blood requests
4. For Patients: Request blood and see matching donors
5. For Admin: Login with admin credentials and manage the system

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/blood-donation
JWT_SECRET=blood_donation_secret_key_2024
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Future Enhancements
- SMS/Email notifications
- Google Maps integration for donor locations
- Blood bank inventory management
- Medical history tracking
- Rating and review system
- Mobile app (React Native)

## License
MIT

## Support
For issues and questions, please create an issue in the repository.
