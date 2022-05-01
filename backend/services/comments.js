const Post = require('../model/Post');

exports.add = async (postId, comment) => {
    const post = await Post.findOne({_id: postId}).exec();
    post.comments.push(comment);
    post.markModified('comments');
    return post.save();
}
exports.delete = async (id, commentId) => {
    console.log(id);
    console.log(commentId);
    const post = await Post.findOne({_id: id}).exec();
    await post.comments.id(commentId).remove();
    post.markModified('comments');
    return post.save();
}