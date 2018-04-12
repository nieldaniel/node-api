const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: String,
    author: String,
    content: String,
    createdAt: { type: Date, default: Date.now() },
    updatedAt: Date
})

module.exports = mongoose.model('post', postSchema)
