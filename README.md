# GitHub Assessment Project – Full Stack Message Board

A minimal full-stack application where users can register, log in, and post short public messages. Built with **MERN Stack** (MongoDB, Express, React, Node.js) and includes optional in-memory **Blockchain integration** to hash each message.

---

## Features

### User Authentication
- Register and Login with JWT-based authentication
- Validations: email format, password length
- Protected routes with token verification

###  Message System
- Logged-in users can post messages (max 250 chars)
- View personal messages (My Messages)
- All messages stored with timestamp and user reference

### Public Feed
- View messages from all users (no login required)
- Displayed in reverse chronological order

### Blockchain 
- Each message is hashed and added to an in-memory blockchain
- Viewable in the **Blockchain Explorer** section

---

## Technologies Used

| Frontend        | Backend         | Extras         |
|-----------------|-----------------|----------------|
| React.js        | Node.js         | dotenv         |
| Axios           | Express.js      | bcryptjs       |
| React Router    | MongoDB (Mongoose) | jsonwebtoken |
| Bootstrap (or custom CSS) | CORS Middleware | Blockchain (SHA-256 Hashing) |

---

## Local Setup Instructions

>  Requires **Node.js** and **MongoDB** or a [MongoDB Atlas Cluster](https://www.mongodb.com/cloud/atlas)

### 1. Clone the Repo
```bash
git clone https://github.com/your-username/github-assessment-project.git
cd github-assessment-project
