const express = require('express');
const protect = require('../utils/protect');
const router = express.Router();
const Post = require('../models/postSchema');
const Project = require('../models/projectSchema');

router.post('/:projectId', protect, async (req, res) => {
    try {
        const { topic, content } = req.body;
        const { projectId } = req.params;
        const userId = req.user._id;

        const post = await Post.create({
            topic,
            content,
            project: projectId,
            createdBy: userId
        });

        await Project.findByIdAndUpdate(projectId, {$push: {posts: post._id}});

        res.status(201).json({
            success: true,
            message: `Post added Successfully!`,
            post
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server Error!`,
            error: error.message
          })
    }
});


router.put('/:postId', protect, async (req, res) => {
    try {
        const { postId } = req.params;
        const { content } = req.body;

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({
                success: false,
                message: `Post not exist`
            })
        }

        post.content = content;
        await post.save();

        res.status(201).json({
            success: true,
            message: `Post edited Successfully!`,
            post
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server Error!`,
            error: error.message
          })
    }
});


router.delete('/:postId', protect, async (req, res) => {
    try {
        const { postId } = req.params;

        const post = await Post.findById(postId);

        if(!post) {
            return res.status(404).json({
                success: false,
                message: `Post not exist`
            })
        }

        await Project.findByIdAndUpdate(post.project, {$pull: {posts: post._id}});

        await post.deleteOne();

        res.status(200).json({
            success: true,
            message: `Post deleted successfully!`
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server Error!`,
            error: error.message
          })
    }
});


// router.get('/:projectId', protect, async (req, res) => {
//     try {
//         const {projectId} = req.params;

//         const posts = await Post.find({project: projectId})
//         .populate('createdBy', 'name email').sort({createdAt: -1});

//         res.status(201).json({
//             success: true,
//             message: `Post rendered Successfully!`,
//             posts
//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: `Server Error!`,
//             error: error.message
//           })
//     }
// })

router.get('/:postId', protect, async (req, res) => {
    try {
        const {postId} = req.params;

        const post = await Post.findById(postId)
        .sort({createdAt: -1});

        res.status(201).json({
            success: true,
            message: `Post rendered Successfully!`,
            post
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