const {Schema, model} = require('mongoose');


const blogpostsSchema = Schema({
    title: { type: String },
    summary: { type: String },
    content: { type: String },
    cover: { type: String },
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    categories: [{ type: String }],
    tags: [{ type: String }],
}, { timestamps: true })

module.exports = model('BlogPosts', blogpostsSchema);