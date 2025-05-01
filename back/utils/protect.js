const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');

const protect = async (req, res, next) => {
try {
    const token = req.cookies.token;
    if(!token) {
        return res.status(400).json({
            success: false,
            message: 'Token expired or invalid'
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');

    if(!user) {
        return res.status(400).json({
            success: false,
            message: 'User not found!'
        })
    }

    req.user = user;
    next();

} catch (error) {
    res.status(400).json({
        success: false,
        message: `Login to use this resource`,
        error: error.message
    })
}
}

module.exports = protect;