const express = require('express')
const postController = require('../controllers/feed')
const {body} = require("express-validator");

const router = express.Router()

//GET /feed/posts
router.get('/posts', postController.getPosts)

//POST /feed/post
router.post('/post',
    [
        body('title')
            .trim()
            .isLength({min: 5}),
        body('content')
            .trim()
            .isLength({min: 5}),
    ],
    postController.createPost)

router.get('/post/:postId', postController.getPost)
router.put('/post/:postId',
    [
        body('title')
            .trim()
            .isLength({min: 5}),
        body('content')
            .trim()
            .isLength({min: 5}),
    ],
    postController.updatePost)

router.delete('/post/:postId', postController.deletePost)

module.exports = router
