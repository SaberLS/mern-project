// ======================= CREATE POST
// POST: api/posts
// PROTECTED
const createPost = async (req,res, next) => {
  res.json('Create Post')
}


// ======================= GET POSTS
// GET: api/posts
// UNPROTECTED
const getPosts = async (req,res, next) => {
  res.json('GET POSTS')
}
// ======================= Get Single Post
// GET: api/posts/:id
// UNPROTECTED
const getPost = async (req,res, next) => {
  res.json('Get Single Post')
}

// ======================= GET POSTS BY CATEGORY
// GET: api/posts/categories/:category
// UNPROTECTED
const getCategoryPosts = async (req,res, next) => {
  res.json('GET POSTS BY CATEGORY')
}

// ======================= GET POSTS BY AUTHOR
// GET: api/posts/users/:id
// UNPROTECTED
const getAuthorPosts = async (req,res, next) => {
  res.json('GET POSTS BY AUTHOR')
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
