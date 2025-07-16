Hosted Link: https://my-blogs-frontend.vercel.app/auth/login

# Blog Website API

## Description

This is a RESTful API built with Node.js and Express.js to power a blog or content management system (CMS). It provides a backend for managing users, blog posts, and categories. The API allows clients (such as a front-end web application or mobile app) to perform CRUD (Create, Read, Update, Delete) operations on these resources. It implements authentication and authorization to secure access to sensitive data and functionalities. This API is designed to be easily scalable and maintainable, following RESTful principles for clear and predictable interactions.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
  - [Users](#users)
  - [Posts](#posts)
  - [Categories](#categories)
- [Usage Examples](#usage-examples)
  - [Creating a User](#creating-a-user)
  - [Fetching Posts](#fetching-posts)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)

## Installation

1. **Clone the repository:**

   The API relies on environment variables for configuration.  You should create a `.env` file in the root directory of the project and define the following variables:

>  *   `DATABASE_URL`: The connection string for your database (e.g., MongoDB).  Example: `mongodb://localhost:27017/blog`
>  *   `JWT_SECRET`: A strong, randomly generated secret key for JWT authentication.  This should be a long and complex string.
>  *   `PORT`: The port on which the API will listen (default: 3000).  Example: `3000`

**Example `.env` file:**


DATABASE_URL=mongodb://localhost:27017/blog
JWT_SECRET=your_super_secret_key_here
PORT=3000
**Important:** Do not commit your `.env` file to your repository!  Add it to your `.gitignore` file.

## API Endpoints

### Users

*   **POST /api/users/register** - Register a new user. Requires `username`, `email`, and `password` in the request body.
*   **POST /api/users/login** - Authenticate an existing user and return a JWT token. Requires `email` and `password` in the request body.
*   **GET /api/users/:id** - Get user details.  Requires a valid JWT token in the `Authorization` header.

### Posts

*   **POST /api/posts** - Create a new post. Requires a valid JWT token in the `Authorization` header and `title`, `content`, and `categoryId` in the request body.
*   **GET /api/posts** - Get all posts. Supports optional query parameters for pagination, filtering, and sorting.
*   **GET /api/posts/:id** - Get a specific post by ID.
*   **PUT /api/posts/:id** - Update an existing post. Requires a valid JWT token and the post ID.
*   **DELETE /api/posts/:id** - Delete a post. Requires a valid JWT token and the post ID.

### Categories

*   **POST /api/categories** - Create a new category. Requires a valid JWT token in the `Authorization` header and `name` in the request body.
*   **GET /api/categories** - Get all categories.
*   **GET /api/categories/:id** - Get a specific category by ID.
*   **PUT /api/categories/:id** - Update an existing category. Requires a valid JWT token and the category ID.
*   **DELETE /api/categories/:id** - Delete a category. Requires a valid JWT token and the category ID.

**Authentication and Authorization:**

Most endpoints (especially those that modify data) require authentication. This is done using JWT (JSON Web Tokens).

1.  Upon successful login (`POST /api/users/login`), the API returns a JWT.
2.  To access protected endpoints, include the JWT in the `Authorization` header of your request, prefixed with `Bearer `.

   Example: `Authorization: Bearer <your_jwt_token>`

## Usage Examples

### Creating a User



## Error Handling

The API returns standard HTTP status codes to indicate the success or failure of a request. Common error responses include:

*   **400 Bad Request:** Invalid request data.  The response body will often contain details about the validation errors.
*   **401 Unauthorized:** Authentication failed or missing token.
*   **403 Forbidden:**  User does not have permission to access the resource.
*   **404 Not Found:** Resource not found.
*   **500 Internal Server Error:** An unexpected error occurred on the server.  Detailed error messages are typically only provided in development environments.

## Project Structure


blogWebiste/
├── models/            # Database models (e.g., User, Post, Category)
├── routes/            # API route definitions
├── controllers/       # Logic for handling API requests
├── middleware/        # Custom middleware (e.g., authentication)
├── index.js             # Main application file
├── package.json       # Project dependencies and scripts

*   **models:** Defines the data structures for users, posts, and categories, typically using an ORM or ODM like Mongoose (for MongoDB) or Sequelize (for PostgreSQL).
*   **routes:**  Defines the API endpoints and maps them to controller functions.
*   **controllers:** Contains the business logic for handling requests, interacting with the database, and returning responses.
*   **middleware:** Includes functions that run before or after requests, such as authentication checks or request logging.
*   **index.js:**  The main entry point of the application, where the Express app is initialized, middleware is configured, routes are defined, and the server starts listening for requests.

## Frontend

 Describe your frontend here.

*   **Tech Stack:** (e.g., React)
*   **Key Features:** (e.g., User authentication, blog post display)
*   **Installation Instructions:** (e.g., `cd frontend`, `npm install`,`npm run dev`)
*   **Directory Structure:** (Briefly explain the structure of your frontend code)
*   **Example:**

 This is a RESTful API built with Node.js and Express.js to power a blog or content management system (CMS). It provides a backend for managing users, blog posts, and categories. The API allows clients (such as a front-end web application or mobile app) to perform CRUD (Create, Read, Update, Delete) operations on these resources. It implements authentication and authorization to secure access to sensitive data and functionalities. This API is designed to be easily scalable and maintainable, following RESTful principles for clear and predictable interactions.
