# Todo User-Based Application 📝

A full-stack web application that allows users to create, manage, and organize their personal to-do lists with user authentication. Built with modern technologies, this application demonstrates fundamental concepts of web development.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [File Descriptions](#file-descriptions)
- [How It Works](#how-it-works)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

This is a user-based Todo application where each user can sign up, log in, and manage their personal to-do list. The application uses JWT (JSON Web Tokens) for secure authentication, ensuring that each user can only see and modify their own todos.

**Key Highlight:** User-specific data management - Your todos are private and only accessible to you!

---

## ✨ Features

### User Authentication
- ✅ **Sign Up** - Create a new account with username and password
- ✅ **Login** - Securely log into your account
- ✅ **Logout** - Safely log out of the application
- 🔐 **Password Encryption** - Passwords are hashed using bcrypt for security

### Todo Management
- ✅ **Create Todos** - Add new tasks to your to-do list
- ✅ **View Todos** - See all your personal todos
- ✅ **Delete Todos** - Remove completed or unwanted tasks
- 🔒 **User-Specific Access** - Todos are linked to individual user accounts

---

## 📁 Project Structure

```
Todo_user_based/
│
├── frontend/                    # User Interface (HTML & JavaScript)
│   ├── login.html              # Login page
│   ├── signup.html             # Sign up page
│   └── home.html               # Main todo management page
│
├── backend/                    # Server-Side Code (Node.js & Express)
│   ├── index.js                # Main server file with all API routes
│   ├── dbConnection.js         # MongoDB connection setup
│   ├── package.json            # Project dependencies
│   ├── package-lock.json       # Locked dependency versions
│   │
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   │
│   └── model/
│       ├── userModel.js        # User schema for MongoDB
│       └── todoSchema.js       # Todo schema for MongoDB
│
├── .gitignore                  # Git configuration file
└── README.md                   # Project documentation
```

---

## 🛠 Tech Stack

### Frontend
- **HTML** (56.3% of codebase)
  - Structure and markup for all pages
  - Form handling for login/signup/todos
  
- **JavaScript** (43.7% of codebase)
  - Dynamic user interactions
  - API communication with backend
  - Local storage for token management

### Backend
- **Node.js** - JavaScript runtime for server
- **Express.js** - Web framework for building REST APIs
- **MongoDB** - NoSQL database for storing users and todos
- **Mongoose** - MongoDB object modeling

### Security & Authentication
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **Bcrypt** - Password hashing and encryption
- **dotenv** - Environment variable management

### Development Tools
- **Nodemon** - Auto-restart server during development
- **Axios** - HTTP client for frontend API calls

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download here](https://git-scm.com/)
- A **text editor** - VS Code, Sublime, etc.

---

## 🚀 Installation Guide

### Step 1: Clone the Repository
```bash
git clone https://github.com/abhinav84094/Todo_user_based.git
cd Todo_user_based
```

### Step 2: Set Up Backend

#### Install Dependencies
```bash
cd backend
npm install
```

#### Create Environment File
Create a `.env` file in the `backend` folder:
```bash
touch .env
```

Add your MongoDB connection string and JWT secret:
```
MONGODB_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key_for_jwt
```

**Example:**
```
MONGODB_URI=mongodb://localhost:27017/todo_app
SECRET_KEY=mysupersecretsecretkey123456
```

**Note:** If using MongoDB Atlas, your connection string will look like:
```
mongodb+srv://username:password@cluster.mongodb.net/todo_app
```

### Step 3: Update Frontend File Paths (Important!)

Open `backend/index.js` and update the file path on line 18:
```javascript
// Current (update this):
res.sendFile("A:\\FULL STACK Web Development MERN\\Project\\2026\\Todo\\frontend\\login.html");

// Change to your local path, for example:
res.sendFile("../frontend/login.html");
```

### Step 4: Start the Server
```bash
npm run dev
```

You should see:
```
Server running on port 3000
MongoDB connected successfully
```

### Step 5: Open the Application
Open your browser and navigate to:
```
http://localhost:3000
```

---

## 💻 Usage

### First Time Using the App?

1. **Sign Up**
   - Click on "Sign Up" link on the login page
   - Enter a username and password
   - Click "Sign Up" button
   - You'll be redirected to the login page

2. **Log In**
   - Enter your username and password
   - Click "Login" button
   - You'll be directed to your todo dashboard

3. **Add a Todo**
   - Type your task in the input field
   - Click the "Submit" button
   - Your todo will appear in the list below

4. **Delete a Todo**
   - Click the "Delete" button next to any todo
   - The todo will be removed from your list

5. **Log Out**
   - Click the "LogOut" button (top-right corner)
   - You'll be redirected to the login page
   - Your token is cleared from local storage

---

## 🔌 API Endpoints

### Public Routes

#### 1. **GET /** - Home Page
```
GET http://localhost:3000/
Response: Serves login.html
```

#### 2. **POST /login** - User Login
```
POST http://localhost:3000/login
Request Body:
{
  "username": "john_doe",
  "password": "password123"
}

Success Response (200):
{
  "message": "Login Successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

Error Responses:
- (400): "User Not Found" - Username doesn't exist
- (400): "Incorrect Password" - Wrong password
```

#### 3. **POST /signup** - User Registration
```
POST http://localhost:3000/signup
Request Body:
{
  "username": "jane_doe",
  "password": "password456"
}

Success Response (200):
{
  "message": "jane_doe successfull signup"
}

Error Responses:
- (400): "please fill the details" - Missing username or password
- (200): "Username Already Exists" - Username is taken
```

### Protected Routes (Require Authentication Token)

#### 4. **POST /todos** - Create a Todo
```
POST http://localhost:3000/todos
Headers:
{
  "Authorization": "your_jwt_token_here"
}
Request Body:
{
  "todo": "Buy groceries"
}

Success Response (200):
{
  "messages": "Buy groceries"
}
```

#### 5. **GET /todos** - Get All Todos for Logged-in User
```
GET http://localhost:3000/todos
Headers:
{
  "Authorization": "your_jwt_token_here"
}

Success Response (200):
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "todo": "Buy groceries",
    "userId": "507f1f77bcf86cd799439010"
  },
  {
    "_id": "507f1f77bcf86cd799439012",
    "todo": "Complete project",
    "userId": "507f1f77bcf86cd799439010"
  }
]
```

#### 6. **DELETE /todos/:id** - Delete a Todo
```
DELETE http://localhost:3000/todos/507f1f77bcf86cd799439011
Headers:
{
  "Authorization": "your_jwt_token_here"
}

Success Response (202):
{
  "messages": "507f1f77bcf86cd799439011 deleted"
}

Error Response (400):
{
  "message": "You are not authorized to delete this todo"
}
```

---

## 📄 File Descriptions

### Frontend Files

#### `login.html` - Login Page
- User login interface
- Username and password input fields
- Login button and signup link
- Redirects to home.html on successful login

#### `signup.html` - Sign Up Page
- New user registration form
- Username and password fields
- Sign up button
- Link back to login page

#### `home.html` - Todo Dashboard
- Main application interface after login
- Input field to add new todos
- Displays list of user's todos
- Delete button for each todo
- Logout button
- Uses Axios for API calls
- Stores JWT token in browser's localStorage

### Backend Files

#### `index.js` - Main Server File
- Express server initialization
- All API route handlers (GET, POST, DELETE)
- Middleware integration
- Database model usage
- Implements authentication middleware for protected routes

#### `dbConnection.js` - Database Connection
- MongoDB connection setup
- Uses Mongoose for database operations
- Handles connection errors

#### `middleware/auth.js` - Authentication Middleware
- Verifies JWT tokens
- Extracts user information from tokens
- Protects routes that require authentication
- Attaches user data to request object

#### `model/userModel.js` - User Schema
- Defines user data structure
- Fields: username, password
- MongoDB schema for user collection

#### `model/todoSchema.js` - Todo Schema
- Defines todo data structure
- Fields: todo (task description), userId (owner reference)
- Links todos to specific users
- MongoDB schema for todo collection

#### `package.json` - Project Dependencies
Lists all required libraries:
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT creation and verification
- `bcrypt` - Password hashing
- `dotenv` - Environment variables
- `nodemon` - Development server auto-reload

---

## 🔐 How It Works

### Authentication Flow

```
1. User enters credentials on signup.html
   ↓
2. POST request sent to /signup endpoint
   ↓
3. Backend checks if username exists
   ↓
4. If not: Password is hashed with bcrypt
   ↓
5. User data saved to MongoDB
   ↓
6. Success message returned to frontend
   ↓
7. User redirected to login.html
```

### Login & Token Generation

```
1. User enters credentials on login.html
   ↓
2. POST request sent to /login endpoint
   ↓
3. Backend finds user and compares hashed password
   ↓
4. If valid: JWT token generated (expires in 24h)
   ↓
5. Token sent back to frontend
   ↓
6. Frontend stores token in localStorage
   ↓
7. User redirected to home.html
```

### Protected Todo Operations

```
1. Frontend sends request with JWT token in header
   ↓
2. auth.js middleware verifies token
   ↓
3. If valid: User ID extracted and attached to request
   ↓
4. Route handler processes request with user context
   ↓
5. Database operation performed (create/read/delete)
   ↓
6. Only user's own todos are returned/modified
   ↓
7. Response sent back to frontend
```

---

## 🌟 Future Enhancements

Here are some ideas to improve this project:

- 📝 **Edit Todos** - Update existing todo text
- ⭐ **Mark as Complete** - Toggle completion status
- 📅 **Due Dates** - Add deadline to todos
- 🏷️ **Categories/Tags** - Organize todos by category
- 🎨 **Styling** - Improve UI with CSS frameworks (Bootstrap, Tailwind)
- 🔍 **Search** - Find todos by keyword
- 📊 **Statistics** - Show todo completion stats
- 🔔 **Notifications** - Alert users for due tasks
- 📱 **Mobile App** - React Native version
- 🌙 **Dark Mode** - Add dark theme option
- 👥 **Collaboration** - Share todos with other users
- 💾 **Data Export** - Export todos as PDF/CSV

---

## 🐛 Troubleshooting

### "Cannot find module" error
**Solution:** Run `npm install` in the backend directory to install all dependencies

### MongoDB connection failed
**Solution:** 
- Check your MongoDB URI in `.env` file
- Ensure MongoDB service is running
- Verify network access if using MongoDB Atlas

### "Invalid token" error
**Solution:**
- Clear browser localStorage: `localStorage.clear()`
- Log in again to get a new token
- Check that token hasn't expired (24h expiration)

### Port 3000 already in use
**Solution:** 
- Change port in `index.js` line 129
- Or kill the process using port 3000

---

## 📞 Support

If you have questions or encounter issues:
1. Check the Troubleshooting section
2. Review the code comments in the files
3. Create an issue on GitHub repository

---

## 📄 License

This project is licensed under the ISC License - see the package.json file for details.

---

## ✍️ Author

**Abhinav Prakash**

---

## 🎓 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Basics](https://jwt.io/introduction)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

**Happy Coding! 🚀**

Feel free to fork this repository and make it your own!
