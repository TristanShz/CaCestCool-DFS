const Post = require('../model/Post');

exports.add = async (postId, comment) => {
    const post = await Post.findOne({_id: postId}).exec();
    console.log(post.comments);
    post.comments.push(comment);
    post.markModified('comments');
    return post.save();
}