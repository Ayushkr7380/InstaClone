**User Authentication API**

***Introduction***

The User Authentication API is a backend service built with Node.js, Express, and MongoDB. It provides functionality for user registration and authentication, allowing clients to securely register new users and authenticate existing ones.

***Installation***

To install and set up the API, follow these steps:

Clone the repository:
    git clone https://github.com/Ayushkr7380/Assignment_Project.git


Navigate to the project directory:
    cd your-directory

Install dependencies:
    npm install

Configure environment variables:
    Create a .env file in the root directory.

Start the server:
	npm run dev

***Usage***

Endpoints

1. POST /user/register: Register a new user.

        --> Required fields: name, email, password.

        --> To register a new user, clients can make a POST request to the /user/register endpoint with the user's details, including their name, email, and password.

2. POST /user/login: Log in with existing credentials.

        --> Required fields: email, password.

        -->To login, clients should make a POST request to the /user/login endpoint with the user's email and password.

***Additional Notes***

1. Upon successful login or registration, a JSON Web Token (JWT) may be generated and sent back in the response. This token can be used for authentication on protected routes.

2. Passwords should be securely hashed before being stored in the database.

3. Error handling should be implemented to handle cases such as missing fields, invalid email formats, etc.

4. Input validation should also be performed to ensure that user-provided data meets the expected criteria.


***Documentation***

1. Overview

    --> The User Authentication API provides a backend service for user registration and authentication. It allows clients to securely register new users and authenticate existing ones using JSON Web Tokens (JWT).

2. Authentication

    --> The API requires authentication for certain endpoints using JWT tokens. Upon successful login, clients receive a token that must be included in the Authorization header of subsequent requests to authenticated endpoints.

3. Endpoints

    --> Register a User
        Method: POST
        Path: /user/register
        Description: Register a new user.
    
    --> Login
        Method: POST
        Path: /user/login
        Description: Log in with existing credentials.

4. Error Handling

    -->The API returns appropriate HTTP status codes and error messages for different scenarios, such as missing fields, invalid credentials, or server errors.

5. Additional Features

    --> JWT Token Expiry: JWT tokens expire after 7 days by default.

    --> Password Hashing: User passwords are securely hashed before being stored in the database.

6. Testing

    -->We recommend using tools like Postman or cURL to test the API endpoints. Detailed examples of requests and responses are provided above.

***Contributing***

    -->Contributions are welcome.

***License***

    -->This project is licensed under the MIT License.

