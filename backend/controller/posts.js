const postService = require("../services/posts.js");
const jwt = require("jsonwebtoken");

exports.add = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ");
        const body = {
            user: jwt.verify(token[1], process.env.SECRET).id,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? req.file.filename : "",
        }
        const post = await postService.add(body);
        res.status(200).send(post);
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

exports.getList = async (req, res) => {
    try {
        const postsList = await postService.getList();
        res.status(200).send(postsList);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.getListByUser = async (req, res) => {
    try {
        const postList = await postService.getListByUser(req.params.userId);
        res.status(200).send(postList);
    } catch (e) {
        res.status(400).send(e);
    }
}
exports.getOne = async (req, res) => {
    try {
        const postOwner = await postService.getOne(req.params.id);
        res.status(200).send(postOwner);
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.delete = async (req, res) => {
    try {
        const postDeleted = await postService.delete(req.params.id);
        res.status(200).send(postDeleted);
    } catch (e) {
        res.status(400).json(e);
    }
}

exports.modify = async (req, res) => {
    try {
        let body;
        if (req.body.image === "delete") {
            await postService.deleteImage(req.params.id);
            body = {
                title: req.body.title,
                description: req.body.description,
                image: "",
            }
        } else {
            body = req.body;
        }
        const postModified = await postService.modify(req.params.id, body);
        if (postModified.modifiedCount === 1) return res.status(200).send(postModified);
        return res.status(400).send({message: "Aucun post trouver avec cet ID"})
    } catch (e) {
        res.status(400).send(e);
    }
}

exports.like = async (req, res) => {
    try {
        const postLiked = await postService.like(req.params.id, req.body.id);
        res.status(200).send(postLiked);
    } catch (e) {
        res.status(400).send(e);
    }
}
