# Expense Tracker API

Welcome to the Expense Tracker API, a robust backend solution for managing personal expenses. Built with Node.js, Express, and MongoDB, this project provides secure user authentication, role-based access control, and full CRUD functionality for tracking expenses.

This API is designed to be a reliable and scalable foundation for any personal finance application.

## 📋 Table of Contents

* [Key Features](#-key-features)
* [Technology Stack](#-technology-stack)
* [Getting Started](#-getting-started)
* [Prerequisites](#prerequisites)
* [Installation--setup](#installation--setup)
* [Running the Application](#running-the-application)
* [API Documentation](#-api-documentation)
* [API Endpoints](#-api-endpoints)

## ✨ Key Features

* Secure Authentication: Utilizes JSON Web Tokens (JWT) and bcryptjs for secure user registration, login, and password management.
* Role-Based Access Control: Differentiates between user and admin roles, ensuring that users can only access and modify their own data, while admins have broader access.
* Complete Expense Management: Full CRUD (Create, Read, Update, Delete) operations allow for comprehensive management of expenses.
* Interactive API Documentation: Integrated Swagger UI provides a live, user-friendly interface for exploring and testing the API endpoints.
* Structured-Maintainable-Code: Follows the MVC (Model-View-Controller) pattern for a clean and scalable architecture.
* Robust Error Handling: Features a centralized error handling mechanism for consistent and predictable error responses.

## 🛠️ Technology Stack

* Backend: Node.js, Express.js
* Database: MongoDB with Mongoose ODM
* Authentication: JSON Web Tokens (JWT), bcryptjs
* API Documentation: Swagger UI Express
* Development Tools: Nodemon, Morgan (for logging), dotenv (for environment variables)
* API Features: vanta-api for advanced filtering, sorting, and pagination.

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running on your machine for development and testing.

### Prerequisites

You must have the following software installed:

* [Node.js](https://nodejs.org/en/) (v14 or higher is recommended)
* [npm](https://www.npmjs.com/) (Node Package Manager)
* [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a cloud instance like MongoDB Atlas)

### Installation-Setup

1. Clone the Repository:
   git clone [https://github.com/amirs0b/Roadmap.sh-Expense-Tracker-API.git](https://github.com/amirs0b/Roadmap.sh-Expense-Tracker-API.git)
   cd Roadmap.sh-Expense-Tracker-API
2. Install Dependencies:
   npm install
3. Configure Environment Variables:
   Create a config.env file in the project's root directory and populate it with the following:
   # --- config.env ---

   # Your MongoDB connection string
   DATA_BASE=mongodb://localhost:27017/Expense-Tracker

   # The port for the server to run on
   PORT=5000

   # A strong, unique secret for signing JSON Web Tokens
   JWT_SECRET=your_super_secret_jwt_string_goes_here

### Running the Application

* Development Mode (with auto-reload):
  npm run dev
* Production Mode:
  npm start

The server will now be running at http://localhost:5000.

## 📚 API Documentation

This project features live, interactive API documentation powered by Swagger. Once the server is running, navigate to the following URL in your browser:

### ➡️ [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

The Swagger UI allows you to visualize all API endpoints, understand their parameters, and test them directly from your browser.

## API Endpoints

All API endpoints are prefixed with /api.

### Authentication (/auth)

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | /auth/register | Register a new user. |
| POST | /auth | Log in to get a JWT. |

### Users (/users)

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| GET | /users | Get a list of all users. | Admin |
| GET | /users/:id | Get a single user by their ID. | Owner |
| PATCH | /users/:id | Update your own user profile. | Owner |

### Expenses (/expenses)

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| POST | /expenses | Create a new expense for yourself. | User |
| GET | /expenses | (Admin Only) Get all expenses. | Admin |
| GET | /expenses/my-expenses | Get a list of your own expenses. | User |
| PATCH | /expenses/:id | Update one of your own expenses. | Owner |
| DELETE | /expenses/:id | Delete one of your own expenses. | Owner |