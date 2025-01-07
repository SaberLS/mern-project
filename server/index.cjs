const express = require( 'express' );
const cors = require('cors')
const {connect} = require('mongoose')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes.cjs')
const postRoutes = require('./routes/postRoutes.cjs')

const {MONGO_URI, PORT} = process.env;

// create an Express application
const app = express();
app.use(
  express.json({extended: true}),
  express.urlencoded({extended: true}),
  cors({ credentials: true, origin: "http://localhost:3000" }),
);

// ------------------------- ROUTES --------------------------
app.use(
  '/api/users', userRoutes
)
app.use(
  '/api/posts', postRoutes
)

// ------------------------- Start server --------------------------
connect(MONGO_URI)
  .then(
    app.listen(
      PORT,
      () => console.log(`Server running on port ${PORT}`)
    ))
  .catch(console.error)
