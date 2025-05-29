**Instaclone**

***Overview***

Instaclone is a social media application where users can register, login, create posts, like posts, and comment on them. The application is built using Node.js and Express.js, with EJS as the templating engine, and supports file uploads and user authentication. Images are uploaded and managed using Cloudinary.



***Features***

1. User Authentication: Registration, login, and logout.

2. Profile Management: Update user profile, including uploading a profile photo.

3. Post Management: Create, view, edit, and delete posts with photo uploads.

4. Interactions: Like posts and comment on them.

5. User Profiles: View other users' profiles and posts.

***Installation***

To install and set up , follow these steps:

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

***API Endpoints***

1. User Authentication Routes

-->POST /register: Register a new user.

-->GET /register: Get the registration page.

-->POST /login: Login a user.

-->GET /login: Get the login page.

-->GET /getuser: Get details of the logged-in user.

-->GET /logout: Logout the current user.

-->POST /updateprofile: Update the user's profile with a new profile photo,bio or name.

2. User Post Routes

-->POST /post: Create a new post with a photo.

-->GET /viewpost/: View a specific post by ID.

-->GET /postdelete/: Delete a post by ID.

-->POST /postedit/: Edit a post by ID.

-->GET /home: Get the home page with posts.

-->GET /othersprofile/: View another user's profile by ID.

-->POST /like: Like a post.

-->POST /comment: Comment on a post.

-->GET /comment/: Get comments for a specific post by ID.

-->GET /alllikes/: Get all likes for a specific post by ID.


***Middlewares***

1. loginDataValidator.js: Validates login data.

2. signUpDataValidator.js: Validates signup data.

3. multer.middleware.js: Handles file uploads.

4. user.LoggedIn.js: Checks if a user is logged in.

***Views***

1. pages/home.ejs: Home page template.

2. pages/login.ejs: Login page template.

3. pages/register.ejs: Registration page template.

4. pages/userdetails.ejs: User profile page template.

5. pages/viewpost.ejs: Single post page template.

6. pages/otherprofile.ejs: Other user profile template.

7. pages/likes.ejs: Single post likes template.

8. pages/comments.ejs: Single post comments template.

***Usage***

1. Registration and Login: Users can register with a unique email , username and password. They can then log in to access their profile and create posts.

2. Profile Management: Logged-in users can update their profiles, including uploading a new profile photo.

3. Post Management: Users can create new posts with photos and captions, view their own and others' posts, edit their posts, and delete them if necessary.

4. Interactions: Users can like posts and comment on them, and view the likes and comments on every posts.

***Additional Notes***

1. Upon successful login or registration, a JSON Web Token (JWT) may be generated and sent back in the response. This token can be used for authentication on protected routes.

2. Passwords should be securely hashed before being stored in the database.

3. Error handling should be implemented to handle cases such as missing fields, invalid email formats, etc.

4. Input validation should also be performed to ensure that user-provided data meets the expected criteria.


***Dependencies***

1. bcryptjs: Library to hash passwords.

2. cloudinary: Cloud service for managing images.

3. cookie-parser: Middleware to parse cookies.

4. cors: Middleware to enable CORS.

5. dotenv: Loads environment variables from a .env file.

6. ejs: Templating engine for rendering HTML pages.

7. express: Web framework for Node.js.

8. jsonwebtoken: Library to work with JSON Web Tokens.

9. mongoose: MongoDB object modeling tool.

10. morgan: HTTP request logger middleware.

11. multer: Middleware for handling multipart/form-data for file uploads.

12. nodemon: Utility that monitors for changes in the source code and automatically restarts the server.

***Contributing***

    -->Contributions are welcome.

***License***

    -->This project is licensed under the MIT License.

=======
# InstaClone

InstaClone is a full-stack Instagram-like social media web application built using Node.js, Express, MongoDB, and EJS. Users can register, log in, update their profile, upload posts with captions and images, view other users’ profiles, like and comment on posts, and explore a dynamic home feed. The app handles file uploads using Multer and stores them on Cloudinary. Authentication is secured with JWT and cookie sessions, while validation is handled via custom middleware. The UI is designed using EJS templates and styled with CSS and JavaScript.

---

## Features
```txt
User Authentication (Register, Login, Logout)

Photo Upload with Multer and Cloudinary

Like and Comment on Posts

View Own and Others' Profiles

Edit or Delete Own Posts

View Post Details and All Likes

Middleware-based Route Protection and Validation

EJS Templates for Frontend Views
```


---

## Tech Stack
```txt
Frontend: EJS, CSS

Backend: Node.js, Express

Database: MongoDB with Mongoose

File Uploads: Multer, Cloudinary

Authentication: JWT + Cookies

Validation: Custom Middlewares

Environment Variables: dotenv
```

---

## Project Structure
```txt
instaClone/
├── config/
│   └── dbConnection.js
├── controllers/
│   ├── userAuth.controllers.js
│   └── userPost.controllers.js
├── middlewares/
│   ├── loginDataValidator.js
│   ├── multer.middleware.js
│   ├── signUpDataValidator.js
│   └── user.LoggedIn.js
├── models/
│   ├── comment.model.js
│   ├── like.model.js
│   ├── userAuth.model.js
│   └── userPost.model.js
├── routes/
│   ├── userAuth.js
│   └── userPost.js
├── static/
│   ├── css/
│   │   └── *.css
│   └── images/
│       ├── Insta-logo.png
│       └── dp.jpg
├── views/
│   ├── *.ejs
├── .env.example
├── .gitignore
├── app.js
├── index.js
├── package.json
└── README.md
```

---

## Installation
```txt
1. Clone the repository

git clone https://github.com/your-username/instaclone.git
cd instaclone

2. Install dependencies

npm install

3. Setup environment variables

Copy .env.example to .env and fill in your MongoDB URI, JWT secret, and Cloudinary credentials.

4.Run the server

npm run dev

5. Visit http://localhost:5000 to start using the app.
```

---

## Scripts

```txt
"scripts": {
  "dev": "nodemon index.js"
}
```

---
## Author

**Ayush**

Feel free to reach out or contribute!
>>>>>>> df29b1067cd6cf54a8c64775e6461ebdaf1043d6
