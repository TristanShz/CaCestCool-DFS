const Post = require("../model/Post");

exports.add = (postBody) => {
    const post = new Post(postBody);
    return post.save();
}
exports.getList = () => {
    return Post.find({}).populate("user").populate("comments.user");
}
exports.getOne = (id) => {
    return Post.findOne({_id: id}).populate("user");
}
exports.delete = (id) => {
    return Post.deleteOne({_id: id});
}
exports.modify = (id, post) => {
    return Post.updateOne({_id: id}, post)
}
