const Post = require('../models/postModel.cjs');
const User = require("../models/userModel.cjs"); // MongoDB database model
const {v4: uuid} = require('uuid');

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
const getPost = async (req,res, next) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if(!post) {
      return next(new HttpError("Post not found", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError(error))
  }
}

// ======================= GET POSTS BY CATEGORY
// GET: api/posts/categories/:category
// UNPROTECTED
const getCategoryPosts = async (req,res, next) => {
  try {
    const {category} = req.params;
    const posts = await Post.find({category}).sort({createdAt: -1});

    if(!posts) {
      return next(new HttpError("Posts Not Found", 404));
    }
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
}

// ======================= GET POSTS BY AUTHOR
// GET: api/posts/users/:id
// UNPROTECTED
const getAuthorPosts = async (req,res, next) => {
    try {
    const {id} = req.params;
    const posts = await Post.find({creator: id}).sort({createdAt: -1});

    if(!posts) {
      return next(new HttpError("Posts Not Found", 404));
    }
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
}

// ======================= EDIT POST
// PATCH: api/posts/:id
// PROTECTED
const editPost = async (req,res, next) => {
  res.json('EDIT POST')
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
