const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    articleId: {
        type: String,
    },
})

module.exports = mongoose.model('Comment', commentSchema)
