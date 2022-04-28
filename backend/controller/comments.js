const commentService = require('../services/comments');

exports.add = async (req, res) => {
    try{
        const comment = await commentService.add(req.params.id, req.body);
        res.status(200).send(comment);
    }catch(e){
        res.status(400).send(e);
    }
}