# Zameen.com-Programming for Information System-CRUD Project
Zameen.com is a Pakistan-based real estate company. This company was founded by Imran Ali Khan in 2006, and its headquarter is in Punjab, Lahore. The main idea of this company is to provide an online marketplace for buying, selling, and renting properties across Pakistan. Zameen.com serves millions of users and connects buyers, sellers, and real estate agents through its services.

More than 200+ employees are currently working in this company, and it has become the most trusted and visited real estate website in Pakistan. Because of this company's services real estate market has become more transparent.

# Problem
Currently, the company is facing the issue of ghost postings. Some sellers create fake listings, and when buyers visit the listed property, they find that it does not exist. Instead, the real estate agents show them different properties. The company is now seeking a solution to this problem.

### [Company Location](https://maps.app.goo.gl/rWNqMtQ9zYMZUuRK6)  
### [Website Link](https://www.zameen.com/)


# Implementation

A full-stack real estate listing web application inspired by **Zameen.com**. This project allows users to register, create property posts, view all listings, edit or delete their own listings, and view post details. Built using **Node.js**, **React (Vite)**, **PostgreSQL**, **Sequelize**, **Multer**, and **Express**.

---

## 🚀 Features

- User authentication (Sign up / Sign in)
- Create, Read, Update, Delete (CRUD) for property listings
- Upload property images using **Multer**
- Sequelize ORM for database operations
- React frontend with **Axios** for API calls
- .env support for secure environment variables

## Tech Stack

### Backend:
- Node.js
- Express.js
- Sequelize (ORM)
- PostgreSQL
- Multer (for image upload)
- dotenv

### Frontend:
- React (Vite)
- Axios
- CSS (custom)

## 🗃️ Database Schema

### `User` Table

| Field        | Type     | Description          |
|--------------|----------|----------------------|
| UserID       | Integer  | Primary Key (Auto)   |
| FirstName    | String   | Required             |
| LastName     | String   | Required             |
| PhoneNumber  | String   | Required, Unique     |
| Email        | String   | Required, Unique     |
| Password     | String   | Required             |
| Profile_pic  | String   | Optional             |
| Bio          | String   | Optional             |

### `PropertyPost` Table

| Field         | Type     | Description              |
|---------------|----------|--------------------------|
| PostID        | Integer  | Primary Key (Auto)       |
| Title         | String   | Required                 |
| Description   | Text     | Required                 |
| Price         | Float    | Required                 |
| PropertyType  | Enum     | "house", "plot", "apartment" |
| Address       | String   | Required                 |
| City          | String   | Required                 |
| Area          | String   | Required                 |
| Bedrooms      | Integer  | Optional                 |
| Bathrooms     | Integer  | Optional                 |
| SizeInSqFt    | Float    | Required                 |
| Image         | String   | Optional (file path)     |
| UserID        | Integer  | Foreign Key to User      |

## 📁 Project Structure

```bash
├── backend
│ ├── models
│ │ ├── users.model.js
│ │ └── propertyPost.model.js
│ ├── config
│ │ └── database.js (.env used)
│ ├── routes
│ ├── controllers
| ├── uploads
| ├── ├── images
│ └── index.js

├── frontend
│ ├── src
│ │ ├── Views
│ │ │ ├── AddPost.jsx
│ │ │ ├── AllPosts.jsx
│ │ │ ├── PostDetails.jsx
│ │ │ ├── SignIn.jsx
| | | ├── SignUp.jsx
│ │ │ └── Profile.jsx
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── vite.config.js
└── .env
```

## Pages Overview

- `SignUp`: Register a new user
- `SignIn`: Authenticate existing user
- `AddPost`: Create a new property listing
- `AllPosts`: View all property listings
- `PostDetails`: View detailed info of a post
- `EditPost`: Update an existing listing

## Setup Instructions


## **Backend:**
**Install dependencies**
```bash
  cd backend
  npm install
```

**Create .env**
```bash
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
```

**Run Server**
```bash
node index.js
```

## **Frontend:**

This is the **frontend** of the CRUD web application. Built with **React 19**, **React Router v7**, and **Axios**, it allows users to interact with real estate listings: add, view, edit, delete, and explore properties. It is styled using **React-Bootstrap** components and communicates with the backend via RESTful APIs.

## Tech Stack

- **React 19**
- **React Router DOM v7**
- **Axios** – for making API requests
- **React Bootstrap** – for UI
- **Vite** – fast React development setup

## Dependencies

```bash
{
  "axios": "^1.10.0",
  "react": "^19.1.0",
  "react-bootstrap": "^2.10.10",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.3"
}
```

### Install dependencies
```bash
cd frontend
npm install
```

**Run the app**

```bash
npm run dev
```


## References & Resources

- [npm](https://www.npmjs.com/) – Package manager for backend and frontend  
- [DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials) for sequelize guides  
- [Stack Overflow](https://stackoverflow.com/) – To resolve bugs  
- [ChatGPT](https://chat.openai.com/) – AI assistance and code guidance  
