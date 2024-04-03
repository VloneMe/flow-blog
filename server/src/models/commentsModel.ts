const mongoose = require('mongoose');
export default mongoose;


const CommentSchema = mongoose.Schema({
    content: { type: String, required: true },
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost'},
    likes: { type: Number, default: 0 }
}, { timestamps: true });


module.exports = mongoose.model('Comments', CommentSchema);