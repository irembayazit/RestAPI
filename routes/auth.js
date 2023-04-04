const express = require('express')
const {body} = require("express-validator");
const User = require('../models/user')
const authController = require('../controllers/auth')
const isAuth = require('../middleware/is-auth')

const router = express.Router();

/**
 * @openapi
 * paths:
 *   /auth/signup:
 *      put:
 *          tags:
 *              - Auth
 *          summary: New user.
 *          requestBody:
 *              description: new user create
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - email
 *                        - password
 *                        - name
 *                      properties:
 *                        email:
 *                          type: string
 *                          default: bayzt.irem@gmail.com
 *                        password:
 *                          type: string
 *                          default: qweqwe
 *                        name:
 *                          type: string
 *                          default: kurt
 *          responses:
 *              200:
 *                  description: Created
 * */
router.put('/signup', [body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, {req}) => {
        return User.findOne({email: value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('E-mail address is already exists!')
            }
        })
    })
    .normalizeEmail(), body('password').trim().isLength({min: 5}), body('name').trim().not().isEmpty()], authController.signup);

/**
 * @openapi
 * paths:
 *   /auth/login:
 *      post:
 *          tags:
 *              - Auth
 *          requestBody:
 *              description: User Login
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - email
 *                        - password
 *                      properties:
 *                        email:
 *                          type: string
 *                          default: bayzt.irem@gmail.com
 *                        password:
 *                          type: string
 *                          default: qweqwe
 *          responses:
 *              200:
 *                  description: Created
 *
 * */
router.post('/login', authController.login)

/**
 * @openapi
 * paths:
 *   /auth/status:
 *      get:
 *          tags:
 *              - Auth
 *          summary: Get user status value.
 *          responses:
 *              200:
 *                  description: Created
 * */
router.get('/status', isAuth, authController.getUserStatus)

/**
 * @openapi
 * paths:
 *   /auth/status:
 *      patch:
 *          tags:
 *              - Auth
 *          summary: Change user status.
 *          requestBody:
 *              description: Enter new user status
 *              required: true
 *              content:
 *                application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                        - status
 *                      properties:
 *                        status:
 *                          type: string
 *          responses:
 *              200:
 *                  description: Created
 * */
router.patch('/status', isAuth, [body('status')
    .trim()
    .not()
    .isEmpty()], authController.updateUserStatus)


module.exports = router
