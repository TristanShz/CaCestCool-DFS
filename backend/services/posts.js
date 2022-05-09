const Post = require("../model/Post")
const path = require("path")
const fs = require("fs")
const User = require("../model/User");

exports.add = (postBody) => {
    const post = new Post(postBody);
    return post.save();
}
exports.getList = () => {
    return Post.find({}).populate(["user", "comments.user"]);
}
exports.getListByUser = (userId) => {
    return Post.find({user: userId}).populate("user").populate("comments.user");
}
exports.getOne = (id) => {
    return Post.findOne({_id: id}).populate("user");
}
exports.delete = (id) => {
    const uploadsFile = fs.readdirSync(path.join(__dirname, "../../src/assets/postImages"));
    Post.findOne({_id: id}, (err, post) => {
        if (uploadsFile.includes(post.image)) {
            fs.unlinkSync(
                path.join(__dirname, "../../src/assets/postImages/", post.image)
            );
        }
    })
    return Post.deleteOne({_id: id});
}
exports.modify = async (id, post, removeImage) => {
    const postToModify = await Post.findOne({_id: id}).exec();
    if (removeImage) {
        const uploadsFile = fs.readdirSync(path.join(__dirname, "../../src/assets/postImages"));
        if (uploadsFile.includes(postToModify.image)) {
            fs.unlinkSync(
                path.join(__dirname, "../../src/assets/postImages", postToModify.image)
            );
        }
    }
    return Post.updateOne({_id: id}, post);
}
exports.like = async (postId, userId) => {
    let post = await Post.findOne({_id: postId}).exec();
    if (post.likes.includes(userId)) {
        const indexToDelete = post.likes.indexOf(userId);
        post.likes.splice(indexToDelete, 1);
    } else {
        post.likes.push(userId);
    }
    post.markModified('likes');
    return post.save();
}

exports.updateReadBy = async (postId, userId) => {
    const post = await Post.findOne({_id: postId}).exec();
    if (post.readBy.includes(userId)) {
        return 0;
    } else {
        post.readBy.push(userId);
        post.markModified('readBy');
        return post.save();
    }
}