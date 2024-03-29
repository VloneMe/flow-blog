const {Schema, model} = require('mongoose');


const blogpostsSchema = Schema({
    title: String,
    summary: String,
    content: String,
    cover: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'}
}, { timestamps: true })

module.exports = model('BlogPosts', blogpostsSchema);