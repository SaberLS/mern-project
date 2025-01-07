// ================= NEW USER
// POST : api/users/register
// UNPROTECTED
const registerUser = (req, res, next) => {
  res.jons("Register User")
}

// ================= Login registered USER
// POST : api/users/login
// UNPROTECTED
const loginUser = (req, res, next) => {
  res.jons("Login User")
}

// ================= USER PROFILE
// GET : api/users/:id
// PROTECTED
const getUser = (req, res, next) => {
  res.jons("Register User")
}

// ================= CHANGE USER AVATAR
// POST : api/users/change-avatar
// PROTECTED
const changeAvatar = (req, res, next) => {
  res.jons("Change User avatar")
}

// ================= EDIT USER DETAILS
// POST : api/users/edit-user
// PROTECTED
const editUser = (req, res, next) => {
  res.jons("Edit user Details")
}

// ================= GET AUTHORS
// GET : api/users/authors
// UNPROTECTED
const getAuthors = (req, res, next) => {
  res.jons("Edit user Details")
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
}
