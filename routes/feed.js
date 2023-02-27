const express = require('express')
const postController = require('../controllers/feed')
const router = express.Router()

//GET /feed/posts
router.get('/posts', postController.getPosts)

//POST /feed/post
router.post('/post', postController.createPost)

module.exports = router