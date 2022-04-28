const commentService = require('../services/comments');
const postService = require("../services/posts");

exports.add = async (req, res) => {
    try{
        const comment = await commentService.add(req.params.id, req.body);
        res.status(200).send(comment);
    }catch(e){
        res.status(400).send(e);
    }
}

exports.delete = async (req, res) => {
    try{
        const commentDeleted = await commentService.delete(req.params.id, req.params.commentId);
        res.status(200).send(commentDeleted);
    }catch(e){
        res.status(400).json(e);
    }
}