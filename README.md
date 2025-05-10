# InstaClone

InstaClone is a full-stack Instagram-like web application built using Node.js, Express, MongoDB, and EJS. Users can register, log in, upload photos, like and comment on posts, view others’ profiles, and update their own profiles. All routes are protected with middleware to ensure secure access.

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
