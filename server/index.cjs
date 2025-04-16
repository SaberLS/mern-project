const express = require( 'express' );
const cors = require('cors')
const upload = require('express-fileupload')
const { connect } = require('mongoose')
require('dotenv').config()

const userRoutes = require('./routes/userRoutes.cjs')
const postRoutes = require('./routes/postRoutes.cjs')
const {errorMiddleware, notFound} = require('./middleware/errorMiddleware.cjs')

// create an Express application
const app = express();
app.use(
  express.json({extended: true}),
  express.urlencoded({extended: true}),
  cors({ credentials: true, origin: process.env.ORIGIN }),
  upload(),
);

// ------------------------- ROUTES --------------------------
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(notFound);
app.use(errorMiddleware);

// ------------------------- Start server --------------------------
connect(process.env.MONGO_URI)
  .then(
    app.listen(
      process.env.PORT,
      () => console.log(`Server running on port ${process.env.PORT}`)
    ))
  .catch(console.error)
