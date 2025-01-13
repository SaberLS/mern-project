const Post = require('../models/postModel.cjs');
const User = require("../models/userModel.cjs"); // MongoDB database model
const {v4: uuid} = require('uuid');

const parseFileName = require('../utils/parseFileName.cjs');
const HttpError = require("../models/errorModel.cjs"); // Error

// Build in Node
const fs = require('fs') // file managment
const path = require('path'); // current path

const thumbnailSizeLimit = 2_000_000; // Mb

// ======================= CREATE POST
// POST: api/posts
// PROTECTED
const createPost = async (req,res, next) => {
  try {
    const {title, category, description} = req.body;
    const {user} = req

    if(!title || !category || !description || !req.files) {
      return next(new HttpError("Fill in all fields and choose thumbnail.", 422))
    }
    const {thumbnail} = req.files;

    const splittedThumbnail = thumbnail.name.split('.'); // thumbnail.name = <name>.<file extension>
    const [ thumbnailType ] = splittedThumbnail.splice(splittedThumbnail.length - 1, 1)
    const thumbnailName = splittedThumbnail.join('');

    if( !(
      thumbnailType === 'jpg'
      || thumbnailType === 'png'
      || thumbnailType === 'jpeg'
    )) {
      throw new Error('Invalid file please provide jpg/png/jpeg');
    }

    if(thumbnail.size > thumbnailSizeLimit) {
      return next(new HttpError("Thumbnail too big. Fil should be less than 2Mb."));
    }

    const newThumbnailName = `${thumbnailName}-${uuid()}.${thumbnailType}`;

    await Post.validate({title, category, description, thumbnail: newThumbnailName, creator: user.id});

    thumbnail.mv(path.join(__dirname, '..', '/uploads', newThumbnailName), async (err) => {
      if(err) {
        return next(new HttpError(err));
      } else {
        const newPost = await Post.create({title, category, description, thumbnail: newThumbnailName, creator: user.id})

        if(!newPost) {
          return next(new HttpError("Post couldn't be created.", 422))
        }

        const currentUser = await User.findById(user.id)

        await User.findByIdAndUpdate(user.id, {posts: currentUser.posts + 1});

        res.status(201).json(newPost)
      }
    })
  } catch (error) {
    return next(new HttpError(error))
  }
}


// ======================= GET POSTS
// GET: api/posts
// UNPROTECTED
const getBy = (Model, filter, sortBy = {updatedAt: -1} ) => {
  let findFunc
  let unpackReq

  if(filter === "id") {
    findFunc = Model.findById.bind(Model);
    unpackReq = (req) => req.params[filter]
  } else {
    findFunc = Model.find.bind(Model);
    unpackReq = (req) => filter ? {[filter]: req.params[filter]} : undefined
  }

  return async (req,res, next) => {
    try {
      const data = await findFunc(unpackReq(req)).sort(sortBy)

    if(!data) {
      return next(new HttpError("Data not found", 404));
    }
      res.status(200).json(data)
    } catch (error) {
      return next(new HttpError(error))
    }
  }
}

const getPosts = getBy(Post);
// ======================= Get Single Post
// GET: api/posts/:id
// UNPROTECTED
const getPost = getBy(Post, 'id')

// ======================= GET POSTS BY CATEGORY
// GET: api/posts/categories/:category
// UNPROTECTED
const getCategoryPosts = getBy(Post, 'category')

// ======================= GET POSTS BY AUTHOR
// GET: api/posts/users/:creator
// UNPROTECTED
const getAuthorPosts = getBy(Post, 'creator')

// ======================= EDIT POST
// PATCH: api/posts/:id
// PROTECTED
const editPost = async (req,res, next) => {
  try {
    const postId = req.params.id
    const userId = req.user.id

    const oldPost = await Post.findById(postId);

    if(userId !== oldPost.creator.toString()){
        return next(new HttpError("Unautorized", 403))
     }

    const {title, category, description} = req.body;
    const thumbnail = req.files.thumbnail;
    const toUpdate = {}

    if(title) toUpdate.thumbnail = thumbnail;
    if(category) toUpdate.category = category;
    if(description) toUpdate.description = description;

    if(thumbnail) {
      if(thumbnail.size > thumbnailSizeLimit) {
        return next(HttpError(`Thumbnail too big. Should be less than ${thumbnailSizeLimit / 1_000_000}mb`, 402));
      }

      const newThumbnailName = parseFileName(thumbnail.name, 'jpg', 'jpeg', 'png')

      fs.unlink(
        path.join(__dirname, '..', 'uploads' ,oldPost.thumbnail),
        async (err) => {
          if(err) {
            return next(new HttpError(err))
          }
        }
      );

      thumbnail.mv(
        path.join(__dirname, '..', 'uploads' ,newThumbnailName),
        async (err) => {
          if(err) {
            return next(new HttpError(err))
          }
        }
      );
      toUpdate.thumbnail = newThumbnailName
    }


    if(!Object.keys(toUpdate).length) {
      return next(new HttpError("Nothing to update.", 422))
    }

    const updatedPost = await Post.findByIdAndUpdate(postId, toUpdate, {new: true});
    if(!updatedPost) {
      return next(new HttpError("Couldn't update Post", 400))
    }

    res.status(200).json(updatedPost);
  } catch(error) {
    return next(new HttpError(error))
  }
}

// ======================= DELETE POST
// DELETE: api/posts/:id
// PROTECTED
const deletePost = async (req,res, next) => {
  res.json('DELETE POST')
}

module.exports = {
  createPost,
  getPosts,
  getPost,
  getCategoryPosts,
  getAuthorPosts,
  editPost,
  deletePost,
}
