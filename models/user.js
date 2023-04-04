const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/**
 * @openapi
 * components:
 *  schemas:
 *      CreateUserInput:
 *          type: Object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  default: test@gmail.com
 *              password:
 *                  type: string
 *                  default: password123
 *
 *
 * */
const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    status:{
        type: String,
        default: 'I am new!'
    },
    posts:[{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

module.exports = mongoose.model('User', userSchema)
