# MERN Project

A full-stack application built with the MERN stack (MongoDB, Express, React, Node.js), allowing users to create and manage posts. The project includes both a backend (API + database) and a frontend (user interface).

## 🔗 Project Links

- **Frontend (React)**: [https://mern-project-client-ydjt.onrender.com](https://mern-project-client-ydjt.onrender.com)
- **Backend (Node Express)**: [https://mern-project-qojz.onrender.com](https://mern-project-qojz.onrender.com)

---

## 📦 Technologies

- **Frontend**: React, React Router, React Quill
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Others**: CORS, dotenv, nodemon
- **Hosting**: Render.com

---

## 🚀 Features

- ✅ Add, edit, and delete posts
- ✅ Image upload support
- ✅ WYSIWYG editor for post content (React Quill)
- ✅ View individual posts
- ✅ Full communication with the backend via REST API

---

## 🧑‍💻 Running Locally

### 1. Server

```bash
cd server
npm install
npm run dev
```
#### 📄 `.env` File
```env
PORT=5000
MONGO_URI=your_mongo_connection_uri
MONGO_USER=your_mongo_username
MONGO_PASSWORD=your_mongo_password
JWT_SECRET=your_secret_key
ORIGIN=http://localhost:3000
```

### 2. Client
```bash
cd client
npm install
npm run dev
```
#### 📄 Plik `.env`
```env
REACT_APP_BASE_URL="http://localhost:5000/api"
REACT_APP_ASSETS_URL="http://localhost:5000"
```
