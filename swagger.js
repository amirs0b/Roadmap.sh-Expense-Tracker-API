const swaggerDocument = {
    "openapi": "3.0.0",
    "info": {
        "title": "Expense Tracker API",
        "description": "A well-documented RESTful API for managing personal expenses. Features user authentication, CRUD operations for expenses, and role-based access.",
        "version": "1.0.0",
        "contact": {
            "name": "API Support",
            "email": "support@example.com"
        }
    },
    "servers": [
        {
            "url": "http://localhost:5000/api",
            "description": "Development Server"
        }
    ],
    "tags": [
        {
            "name": "Auth",
            "description": "User Authentication"
        },
        {
            "name": "Users",
            "description": "User Management"
        },
        {
            "name": "Expenses",
            "description": "Expense Management"
        }
    ],
    "components": {
        "securitySchemes": {
            "bearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT",
                "description": "Enter JWT token"
            }
        },
        "schemas": {
            "User": {
                "type": "object",
                "properties": {
                    "_id": { "type": "string", "example": "60d0fe4f5311236168a109ca" },
                    "username": { "type": "string", "example": "johndoe" },
                    "email": { "type": "string", "format": "email", "example": "johndoe@example.com" },
                    "role": { "type": "string", "enum": ["user", "admin"], "example": "user" },
                    "createdAt": { "type": "string", "format": "date-time" },
                    "updatedAt": { "type": "string", "format": "date-time" }
                }
            },
            "UserRegister": {
                "type": "object",
                "required": ["username", "password"],
                "properties": {
                    "username": { "type": "string", "example": "newuser" },
                    "email": { "type": "string", "format": "email", "example": "newuser@example.com" },
                    "password": { "type": "string", "format": "password", "example": "password123", "description": "Min 8 characters, at least one letter and one number." }
                }
            },
            "UserLogin": {
                "type": "object",
                "required": ["username", "password"],
                "properties": {
                    "username": { "type": "string", "example": "johndoe" },
                    "password": { "type": "string", "format": "password", "example": "password123" }
                }
            },
            "LoginSuccessResponse": {
                "type": "object",
                "properties": {
                    "status": { "type": "string", "example": "success" },
                    "data": {
                        "type": "object",
                        "properties": {
                            "token": { "type": "string", "example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
                            "user": { "$ref": "#/components/schemas/User" }
                        }
                    }
                }
            },
            "Expense": {
                "type": "object",
                "properties": {
                    "_id": { "type": "string", "example": "60d0fe4f5311236168a109cb" },
                    "userId": { "type": "string", "example": "60d0fe4f5311236168a109ca" },
                    "amount": { "type": "number", "format": "float", "example": 49.99 },
                    "category": { "type": "string", "enum": ["Groceries", "Leisure", "Electronics", "Utilities", "Clothing", "Health", "Other"], "example": "Electronics" },
                    "description": { "type": "string", "example": "New headphones" },
                    "date": { "type": "string", "format": "date", "example": "2025-09-12" },
                    "createdAt": { "type": "string", "format": "date-time" },
                    "updatedAt": { "type": "string", "format": "date-time" }
                }
            },
            "CreateExpense": {
                "type": "object",
                "required": ["amount", "category", "date"],
                "properties": {
                    "amount": { "type": "number", "format": "float", "example": 12.50 },
                    "category": { "type": "string", "enum": ["Groceries", "Leisure", "Electronics", "Utilities", "Clothing", "Health", "Other"], "example": "Groceries" },
                    "description": { "type": "string", "example": "Weekly groceries" },
                    "date": { "type": "string", "format": "date", "example": "2025-09-15" }
                }
            },
            "Error": {
                "type": "object",
                "properties": {
                    "status": { "type": "string", "example": "fail" },
                    "message": { "type": "string", "example": "Resource not found" }
                }
            }
        }
    },
    "paths": {
        "/auth/register": {
            "post": {
                "tags": ["Auth"],
                "summary": "Register a new user",
                "requestBody": { "required": true, "content": { "application/json": { "schema": { "$ref": "#/components/schemas/UserRegister" } } } },
                "responses": {
                    "201": { "description": "User registered successfully" },
                    "400": { "description": "Bad Request (e.g., username taken, invalid password)" }
                }
            }
        },
        "/auth": {
            "post": {
                "tags": ["Auth"],
                "summary": "Login a user",
                "requestBody": { "required": true, "content": { "application/json": { "schema": { "$ref": "#/components/schemas/UserLogin" } } } },
                "responses": {
                    "200": { "description": "Successful login", "content": { "application/json": { "schema": { "$ref": "#/components/schemas/LoginSuccessResponse" } } } },
                    "400": { "description": "Invalid username or password" }
                }
            }
        },
        "/users": {
            "get": {
                "tags": ["Users"],
                "summary": "Get all users (Admin only)",
                "security": [{ "bearerAuth": [] }],
                "responses": {
                    "200": { "description": "A list of users", "content": { "application/json": { "schema": { "type": "array", "items": { "$ref": "#/components/schemas/User" } } } } },
                    "403": { "description": "Forbidden - Admin access required" }
                }
            }
        },
        "/users/{id}": {
            "get": {
                "tags": ["Users"],
                "summary": "Get a single user by ID",
                "security": [{ "bearerAuth": [] }],
                "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "string" }, "description": "The user ID" }],
                "responses": {
                    "200": { "description": "User details", "content": { "application/json": { "schema": { "$ref": "#/components/schemas/User" } } } },
                    "403": { "description": "Forbidden" },
                    "404": { "description": "User not found" }
                }
            },
            "patch": {
                "tags": ["Users"],
                "summary": "Update a user's details",
                "security": [{ "bearerAuth": [] }],
                "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "string" }, "description": "The user ID" }],
                "requestBody": { "content": { "application/json": { "schema": { "properties": { "username": { "type": "string" }, "email": { "type": "string" } } } } } },
                "responses": {
                    "200": { "description": "User updated", "content": { "application/json": { "schema": { "$ref": "#/components/schemas/User" } } } },
                    "403": { "description": "Forbidden" },
                    "404": { "description": "User not found" }
                }
            }
        },
        "/expenses": {
            "post": {
                "tags": ["Expenses"],
                "summary": "Create a new expense",
                "security": [{ "bearerAuth": [] }],
                "requestBody": { "required": true, "content": { "application/json": { "schema": { "$ref": "#/components/schemas/CreateExpense" } } } },
                "responses": {
                    "201": { "description": "Expense created", "content": { "application/json": { "schema": { "$ref": "#/components/schemas/Expense" } } } },
                    "400": { "description": "Bad Request" }
                }
            },
            "get": {
                "tags": ["Expenses"],
                "summary": "Get all expenses (Admin only)",
                "description": "Admin endpoint to retrieve all expenses from all users.",
                "security": [{ "bearerAuth": [] }],
                "responses": {
                    "200": { "description": "A list of all expenses", "content": { "application/json": { "schema": { "type": "array", "items": { "$ref": "#/components/schemas/Expense" } } } } },
                    "403": { "description": "Forbidden - Admin access required" }
                }
            }
        },
        "/expenses/my-expenses": {
            "get": {
                "tags": ["Expenses"],
                "summary": "Get my expenses",
                "description": "Retrieves all expenses for the currently logged-in user.",
                "security": [{ "bearerAuth": [] }],
                "responses": {
                    "200": { "description": "A list of the user's expenses", "content": { "application/json": { "schema": { "type": "array", "items": { "$ref": "#/components/schemas/Expense" } } } } },
                    "401": { "description": "Unauthorized" }
                }
            }
        },
        "/expenses/{id}": {
            "patch": {
                "tags": ["Expenses"],
                "summary": "Update an expense",
                "security": [{ "bearerAuth": [] }],
                "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "string" }, "description": "The expense ID" }],
                "requestBody": { "content": { "application/json": { "schema": { "$ref": "#/components/schemas/CreateExpense" } } } },
                "responses": {
                    "200": { "description": "Expense updated", "content": { "application/json": { "schema": { "$ref": "#/components/schemas/Expense" } } } },
                    "403": { "description": "Forbidden" },
                    "404": { "description": "Expense not found" }
                }
            },
            "delete": {
                "tags": ["Expenses"],
                "summary": "Delete an expense",
                "security": [{ "bearerAuth": [] }],
                "parameters": [{ "in": "path", "name": "id", "required": true, "schema": { "type": "string" }, "description": "The expense ID" }],
                "responses": {
                    "204": { "description": "Expense deleted successfully" },
                    "403": { "description": "Forbidden" },
                    "404": { "description": "Expense not found" }
                }
            }
        }
    }
};

export default swaggerDocument;
