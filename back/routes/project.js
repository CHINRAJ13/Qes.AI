const express = require('express');
const protect = require('../utils/protect');
const router = express.Router();
const Project = require('../models/projectSchema');
const User = require('../models/userSchema');

router.post('/create', protect, async (req, res) => {
    try {
        const {title} = req.body;
        const userId = req.user._id;
        
        const project = await Project.create({
            title,
            user: userId
        });

        await User.findByIdAndUpdate(userId, {$push: {projects: project._id}});

        res.status(200).json({
            success: true,
            message: `Project created successfully!`,
            project
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server Error!`,
            error: error.message
          })
    }
});


router.get('/', protect, async (req, res) => {
    try {
        const userId = req.user._id;

        const projects = await Project.find({user: userId}).populate('posts');

        res.status(201).json({
            success: true,
            message: `Project rendered Successfully!`,
            projects
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server Error!`,
            error: error.message
          })
    }
})

router.get('/:projectId', protect, async (req, res) => {
    try {
        const { projectId } = req.params;

        // const projects = await Project.find({user: userId}).populate('posts');

        const project = await Project.findById(projectId).populate('posts');

        res.status(201).json({
            success: true,
            message: `Project rendered Successfully!`,
            project
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