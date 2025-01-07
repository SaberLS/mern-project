const { HttpError } = require("../models/errorModel.cjs"); // Error
const User = require("../models/userModel.cjs"); // MongoDB database model

// npm packages
const validator = require('validator'); // validate Password & Email
const bcrypt = require('bcryptjs'); // encrypt Users password
const jwt = require('jsonwebtoken') // generate access token

// Build in Node
const fs = require('fs') // file managment
const path = require('path') // current path

const avatarSizeLimit = 500/*kb*/ * 1024

// ================= NEW USER
// POST : api/users/register
// UNPROTECTED
const registerUser = async (req, res, next) => {
  try {
    const {name, email, password, password2} = req.body;

    // --------- Input validation ---------
    if(!name || !email || !password) {
      throw new Error('Fiill in all fields');
    }

    const lowerEmail = email.toLowerCase();
    if(!validator.isEmail(lowerEmail)) {
      throw new Error('Invalid email');
    };

    const emailExists = await User.findOne({email: lowerEmail})

    if(emailExists) {
      throw new Error('Email already exists');
    }

    if(!validator.isStrongPassword(password)) {
      throw new Error("Password is to week")
    }

    if(password !== password2) {
      throw new Error("Passwords do not match.")
    }

    // --------- Hash Password ---------
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt);

    // Create new User
    const newUser = await User.create({name, email: lowerEmail, password: hashedPass})

    // Response
    res.status(201).json(`New user ${newUser.email} registered`)

  } catch (error) {
    return next(new HttpError(`User registration failed. ${error.message}`, 422))
  }
}

// ================= Login registered USER
// POST : api/users/login
// UNPROTECTED
const loginUser = async (req, res, next) => {
  try {
    const {email, password} = req.body;

    if(!email || !password) {
      throw new Error('Fiill in all fields');
    }
    const lowerEmail = email.toLowerCase();

    const user = await User.findOne({email: lowerEmail})

    if(!user) {
      throw new Error('Invalid email or password.');
    }

    const comaprePass = await bcrypt.compare(password, user.password)
    if(!comaprePass) {
      throw new Error('Invalid email or password.');
    }

    const {_id: id, name} = user;
    // Create users token
    const token = jwt.sign(
      {id, name},
      process.env.JWT_SECRET,
      {expiresIn: "1d"}
    )

    res.status(200).json({token, id, name})
  }catch (error){
    return next(new HttpError(`User registration failed. ${error.message}`, 422))
  }
}

// ================= USER PROFILE
// GET : api/users/:id
// PROTECTED
const getUser = async (req, res, next) => {
  const {id} = req.params;
  const user = await User.findById(id).select('-password')

  if(!user) {
    throw new Error('User not found');
  }

  res.status(200).json(user);
}

// ================= CHANGE USER AVATAR
// POST : api/users/change-avatar
// PROTECTED
const changeAvatar = async (req, res, next) => {
  try {
    if(!req.files.avatar) throw new Error('Please choose an image.');


    const {avatar} = req.files;
    const splittedAvatar = avatar.name.split('.'); // avatar.name = <name>.<file extension>
    const [ avatarType ] = splittedAvatar.splice(splittedAvatar.length - 1, 1)
    const avatarName = splittedAvatar.join('');

    if( !(
      avatarType === 'jpg'
      || avatarType === 'png'
      || avatarType === 'jpeg'
    )) {
      throw new Error('Invalid file please provide jpg/png/jpeg');
    }

    // find user from database
    const user = await User.findById(req.user.id);

    // delete old avatar if exists
    if(user.avatar) {
      fs.unlink(
        path.join(__dirname, '..', 'uploads', user.avatar),
        (error) => {
          if(error) throw error;
        })
    }

    // check file size
    if(avatar.size > avatarSizeLimit) {
      throw new Error("Picture too big, Should be less than 500 kb")
    }

    const newFilename = `${avatarName}-${user._id}.${avatarType}`
    avatar.mv(
      path.join(__dirname, '..', 'uploads', newFilename), async (error) => {
        if(error) throw error;

        const updatedUser = await User.findByIdAndUpdate(req.user.id, {avatar: newFilename }, {new: true, password: false},)

        if(!updatedUser) {
          throw new HttpError("Avatar couldn't be changed", 422);
        }
        res.status(200).json(updatedUser.avatar);
      }
    )
  } catch (error) {
    return next(new HttpError(error))
  }
}

// ================= EDIT USER DETAILS
// POST : api/users/edit-user
// PROTECTED
const editUser = async (req, res, next) => {
  res.json("Edit user Details")
}

// ================= GET AUTHORS
// GET : api/users/authors
// UNPROTECTED
const getAuthors = async (req, res, next) => {
  try {
    const authors = await User
      .find()
      .select('-password');

    res.json(authors);
  } catch (error) {
    return next(new HttpError(error.message))
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors,
}
