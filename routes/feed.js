const express = require('express')
const postController = require('../controllers/feed')
const {body} = require("express-validator");
const isAuth = require('../middleware/is-auth')

const router = express.Router()

/**
 * @openapi
 * /feed/posts:
 *  get:
 *      tags:
 *          - Post
 *      produces:
 *          - application/json
 *      description: test first request service
 *      parameters:
 *         - in: query
 *           name: page
 *           type: integer
 *           required: true
 *           description: description of parameter
 *      responses:
 *          200:
 *              description: "Success"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: Array
 *                      example:
 *                       "message": "Success get posts"
 * */
router.get('/posts', isAuth, postController.getPosts)

/**
 * @openapi
 * paths:
 *  /feed/post:
 *      post:
 *          tags:
 *              - Post
 *          requestBody:
 *              description: new user create
 *              required: true
 *              content:
 *                image/png:
 *                  schema:
 *                    type: string
 *                    format: binary
 *                application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - title
 *                        - content
 *                      properties:
 *                        title:
 *                          type: string
 *                        content:
 *                          type: string
 *          responses:
 *              200:
 *                  description: Created
 * */
router.post('/post', isAuth,
    [
        body('title')
            .trim()
            .isLength({min: 5}),
        body('content')
            .trim()
            .isLength({min: 5}),
    ],
    postController.createPost)

/**
 * @openapi
 * /feed/post/{postId}:
 *  get:
 *      tags:
 *          - Post
 *      parameters:
 *         - in: path
 *           name: postId
 *           type: string
 *           required: true
 *           description: description of parameter
 *      responses:
 *          200:
 *              description: "Success"
 *              content:
 *                  example:
 *                      "message": "Success get post"
 * */
router.get('/post/:postId', isAuth, postController.getPost)

/**
 * @openapi
 * path:
 *  /feed/post/{postId}:
 *      put:
 *          tags:
 *              - Post
 *          summary: Creates a new user.
 *          consumes:
 *              - application/json
 *          parameters:
 *             - in: path
 *               name: postId
 *               type: string
 *               required: true
 *               description: description of parameter
 *             - in: body
 *               name: post
 *               description: The post to create.
 *               schema:
 *                 type: object
 *                 required:
 *                   - title
 *                   - content
 *                   - imageUrl
 *                 properties:
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *          responses:
 *              200:
 *                  description: Created
 * */
router.put('/post/:postId', isAuth,
    [
        body('title')
            .trim()
            .isLength({min: 5}),
        body('content')
            .trim()
            .isLength({min: 5}),
    ],
    postController.updatePost)

/**
 * @openapi
 * /feed/post/{postId}:
 *  delete:
 *      tags:
 *          - Post
 *      parameters:
 *         - in: path
 *           name: postId
 *           type: string
 *           required: true
 *           description: description of parameter
 *      responses:
 *          200:
 *              description: "Success"
 *              content:
 *                  example:
 *                      "message": "Success get posts"
 * */
router.delete('/post/:postId', isAuth, postController.deletePost)

module.exports = router
