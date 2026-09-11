# Ideamagix Online Lecture Scheduling Module

## Live Project
Frontend:
Backend API:

## Tech Stack
React.js
Node.js
Express.js
MongoDB Atlas
JWT Authentication
Multer

## Features
Admin Dashboard
Instructor Dashboard
Course Management
Lecture Scheduling
Instructor Conflict Validation
Role-Based Authentication
Responsive UI

## Installation

Backend

cd backend
npm install
npm start

Frontend

cd frontend
npm install
npm run dev

## Environment Variables

Backend

PORT=5000
MONGO_URI=
JWT_SECRET=

Frontend

VITE_API_URL=http://localhost:5000/api

## Demo Credentials

Admin

Email: admin@ideamagix.com
Password: admin123

Instructor

Email: rahul@test.com
Password: 123456

## API Routes

POST /api/auth/register
POST /api/auth/login
GET /api/auth/instructors

POST /api/course
GET /api/course
PUT /api/course/:id
DELETE /api/course/:id

POST /api/lecture
GET /api/lecture/course/:id
GET /api/lecture/my-lectures

## Database

MongoDB Atlas Database Name:
lectureScheduler

Database Dump Included:
lectureScheduler.json