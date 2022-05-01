const Post = require("../model/Post")
const path = require("path")
const fs = require("fs")

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
    const uploadsFile = fs.readdirSync(path.join(__dirname, "../../src/assets/uploads"));
    Post.findOne({_id: id }, (err, post) => {
        if(uploadsFile.includes(post.image)) {
            fs.unlinkSync(
                path.join(__dirname, "../../src/assets/uploads/", post.image)
            );
        }
    })
    return Post.deleteOne({_id: id});
}
exports.modify = (id, post) => {
    return Post.updateOne({_id: id}, post)
}
