const mongoose = require('mongoose');
export default mongoose;


const CommentSchema = mongoose.Schema({
    content: { type: String, required: true },
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    post: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true }
}, { timestamps: true });


module.exports = mongoose.model('Comments', CommentSchema);