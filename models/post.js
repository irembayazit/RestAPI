const mongoose = require('mongoose')
const {Schema} = require("mongoose");
const schema = mongoose.Schema

// timestamps: eklenen verilere otomatik olarak creratedAt ve updatedAt ekler!
const postSchema = new schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Post', postSchema)
