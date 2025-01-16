const {Router} = require('express');
const {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors,
} = require("../controllers/userControllers.cjs")

const authMiddleware = require('../middleware/authMiddleware.cjs');

const router = Router();

// -------------- Routes --------------
router.post('/register',registerUser)
router.post('/login',loginUser);

router.patch('/change-avatar', authMiddleware, changeAvatar);
router.patch('/edit-user', authMiddleware, editUser);

router.get( '/:id', getUser);
router.get('/', getAuthors);

module.exports = router;
