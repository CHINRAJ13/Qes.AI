var express = require('express');
var router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const protect = require('../utils/protect');

const createToken = (userId) => {
  return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '7d'});
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email}).select('+password');

    if(!user) {
      return res.status(404).json({
        success: false,
        message: `User not found!`
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      return res.status(404).json({
        success: false,
        message: `Incorrect credintials!`
      })
    }

    const token = createToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      maxAge: 7* 24* 60* 60* 1000 // 7 days
    })

    res.status(201).json({
      success: true,
      message: `Loggedin Successfully!`,
      user
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error!`,
      error: error.message
    })
  }
})


router.get('/get-user', protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate('projects');

    res.status(201).json({
      success: true,
      message: `Data rendered successfully!`,
      user
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error!`,
      error: error.message
    })
  }
})


router.post('/logout', protect, async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
    })

    res.status(200).json({
      success: true,
      message: `Logged out successfully!`,
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error!`,
      error: error.message
    })
  }
})


router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({email});

    if(user) {
      return res.status(400).json({
        success: false,
        message: `User already exist!`
      })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({name, email, password: hashedPassword});

    const token = createToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 7* 24* 60* 60* 1000 // 7 days
    })

    res.status(201).json({
      success: true,
      message: `User Created Successfully!`,
      user
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error!`,
      error: error.message
    })
  }
})

module.exports = router;
