import mongoose from 'mongoose';

let Post = mongoose.model('Post', {
    title: String,
    description: String,
    rating: Number
});

export default Post;