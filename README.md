📌 Project Overview

This project demonstrates the ability to build a modern, scalable, and secure web application with proper frontend–backend integration.
The primary focus is on frontend engineering, while implementing a supportive backend to handle authentication and data operations.

The application includes:

User authentication (JWT-based)

Protected dashboard

CRUD operations on a sample entity

Search & filter functionality

Secure API integration

🛠️ Tech Stack
Frontend

React.js

Tailwind CSS

Axios

React Router DOM

Redux

Backend

Node.js

Express.js

JWT (JSON Web Tokens)

bcrypt (password hashing)

Database

 MongoDB 

Tools

Postman – API testing

GitHub – Version control

✨ Features Implemented
🔐 Authentication

User Signup & Login

JWT-based authentication

Secure password hashing using bcrypt

Token-based protected routes

📊 Dashboard

User profile display (fetched from backend)

Logout flow

🛡️ Security

Hashed passwords

JWT verification middleware

Input validation (client & server side)

Centralized error handling

📱 UI/UX

Fully responsive design

Clean and modern UI using Tailwind CSS

User-friendly forms with validation feedback

📂 Project Structure
root
│
├── frontend
│   ├── src
│   │   ├── assets
│   │       ├── Axios
│   │   └── App.jsx
│   └── package.json
│
├── backend
│   ├── controllers
│   ├── routes
│   ├── middleware
│   ├── models
│   ├── config
│   └── Index.js
│
├── README.md
└── .env

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/JONUSharma/Login-signup/

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

PORT=2020
JWT_SECRET=your_secret_key
DATABASE_URL=your_database_url


Start the backend server:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🔗 API Endpoints (Sample)
Auth

POST /user/signup – Register user

POST /user/login – Login user

Sample Entity

GET /task/fetch-task – Fetch all tasks

POST /api/items – Create task

PUT /api/items/:id – Update item

DELETE /api/items/:id – Delete item

🧪 API Testing

Postman collection included

All endpoints tested with authentication headers

👉 Postman Collection Link:
[(https://web.postman.co/workspace/My-Workspace~b9eb893c-7bf9-45c6-8ad5-eeae5e492634/folder/38749150-ae5479ce-4fa2-4cdb-b784-d9fb6cb4d44d?ctx=documentation)](https://web.postman.co/workspace/My-Workspace~b9eb893c-7bf9-45c6-8ad5-eeae5e492634/collection/38749150-5df66c87-d118-46b3-bece-6d1732804801?action=share&source=copy-link&creator=38749150)

🌐 Deployment (Optional)

Frontend: Vercel 

Backend: Render 

👉 Live URL):

Frontend: (https://todo-app-smoky-nine-86.vercel.app/)



👤 Author

Jonu Sharma
Web Developer

GitHub: https://github.com/your-username

LinkedIn: https://linkedin.com/in/your-profile

Email: your-email@example.com
