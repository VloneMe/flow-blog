const mongoose = require('mongoose');
export default mongoose;


const blogpostsSchema = mongoose.Schema({
    title: String,
    summary: String,
    content: String,
    cover: String
}, { timestamps: true })

module.exports = mongoose.model('BlogPosts', blogpostsSchema);