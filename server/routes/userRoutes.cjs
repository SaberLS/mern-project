const {Router} = require('express');
const {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
} = require("../controllers/userControllers.cjs")

const router = Router();

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get( '/:id', getUser,)
router.post('/change-avatar',changeAvatar)
router.post('/edit-user', editUser)

router.get('/', (req, res, next) => {
  res.json("This is the user route")
});

module.exports = router;
