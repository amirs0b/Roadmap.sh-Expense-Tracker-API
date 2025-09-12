# Expense Tracker API

A secure and well-documented RESTful API for managing personal expenses, built with Node.js, Express, and MongoDB. This project provides a complete backend solution with user authentication, role-based access control, and full CRUD (Create, Read, Update, Delete) functionality for expenses.

## ✨ Key Features

* **Secure Authentication**: Uses JSON Web Tokens (JWT) for secure user registration and login.
* **Role-Based Access Control**: Differentiates between regular user and admin roles, with specific permissions for each.
* **Complete Expense Management**: Full CRUD operations for creating, viewing, updating, and deleting expenses.
* **Interactive API Documentation**: Integrated Swagger UI for live, interactive API documentation and testing.
* **Structured Codebase**: Follows a logical MVC (Model-View-Controller) pattern for scalability and maintainability.
* **Validation & Error Handling**: Robust input validation and centralized error handling.

## 🛠️ Tech Stack

* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose ODM
* **Authentication**: JSON Web Tokens (JWT), bcryptjs
* **API Documentation**: Swagger UI Express
* **Utilities**: vanta-api for feature handling, morgan for logging, dotenv for environment variables.

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

You must have the following installed on your machine:

* [Node.js](https://nodejs.org/en/) (v14 or higher)
* [npm](https://www.npmjs.com/) (Node Package Manager)
* [MongoDB](https://www.mongodb.com/try/download/community) (running locally or a cloud instance)

### Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/amirs0b/Roadmap.sh-Expense-Tracker-API.git](https://github.com/amirs0b/Roadmap.sh-Expense-Tracker-API.git)
    cd Roadmap.sh-Expense-Tracker-API
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Set up environment variables**:
    Create a file named `config.env` in the root of the project and add the following variables.
    ```env
    # --- config.env ---

    # Your MongoDB connection string
    DATA_BASE=mongodb://localhost:27017/Expense-Tracker

    # Port for the server to run on
    PORT=5000

    # A strong, secret string for signing JWTs
    JWT_SECRET=your_super_secret_jwt_string_here
    ```

### Running the Application

* **Development Mode**: To run the server with nodemon for automatic restarts on file changes:
    ```bash
    npm run dev
    ```
* **Production Mode**:
    ```bash
    npm start
    ```

The server will be running at http://localhost:5000.

## 📚 API Documentation

This project uses Swagger for interactive API documentation. Once the server is running, you can access the documentation in your browser at:

➡️ [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

The documentation allows you to see all available endpoints, their required parameters, and response models. You can also execute API requests directly from the UI, which is a great way to test the endpoints.

## Endpoints Overview

All endpoints are prefixed with `/api`.

| Method | Endpoint          | Description                 | Protected | Access |
| :----- | :---------------- | :-------------------------- | :-------- | :----- |
| POST   | /auth/register    | Register a new user         | No        | Public |
| POST   | /auth             | Log in a user               | No        | Public |
| GET    | /users            | Get all users               | Yes       | Admin  |
| GET    | /users/:id        | Get a single user by ID     | Yes       | User   |
| PATCH  | /users/:id        | Update a user               | Yes       | User   |
| POST   | /expenses         | Create a new expense for self | Yes       | User   |
| GET    | /expenses         | (Admin) Get all expenses    | Yes       | Admin  |
| GET    | /expenses/my-expenses | (User) Get own expenses     | Yes       | User   |
| PATCH  | /expenses/:id     | Update an owned expense     | Yes       | User   |
| DELETE | /expenses/:id     | Delete an owned expense     | Yes       | User   |

## 💡 Project Source

This project was built as a solution for the "Expense Tracker API" project idea, which is part of the Backend Developer learning path on [roadmap.sh](https://roadmap.sh/backend). It serves as a practical application of the concepts and technologies covered in the roadmap.