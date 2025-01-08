const {Router} = require('express');
const {
  createPost,
  getPosts,
  getPost,
  getCategoryPosts,
  getAuthorPosts,
  editPost,
  deletePost,
} = require('../controllers/postController.cjs')

const authMiddleware = require('../middleware/authMiddleware.cjs')

const router = Router();

router.get('/:id', getPost);
router.get('/', getPosts);
router.get('/categories/:category', getCategoryPosts);
router.get('/users/:id', getAuthorPosts);

router.post('/', authMiddleware, createPost);

router.patch('/:id',authMiddleware, editPost);
router.delete('/:id',  authMiddleware, deletePost);

module.exports = router;
