const express = require( 'express' );
const cors = require('cors')
const upload = require('express-fileupload')
const { connect } = require('mongoose')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes.cjs')
const postRoutes = require('./routes/postRoutes.cjs')
const {errorMiddleware, notFound} = require('./middleware/errorMiddleware.cjs')

const {MONGO_URI, PORT} = process.env;

// create an Express application
const app = express();
app.use(
  express.json({extended: true}),
  express.urlencoded({extended: true}),
  cors({ credentials: true, origin: "http://localhost:3000" }),
  upload(),
);

// ------------------------- ROUTES --------------------------
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(notFound);
app.use(errorMiddleware);

// ------------------------- Start server --------------------------
connect(MONGO_URI)
  .then(
    app.listen(
      PORT,
      () => console.log(`Server running on port ${PORT}`)
    ))
  .catch(console.error)
