const express = require('express')
const PostsController = require("../controller/posts.js")
const CommentsController = require("../controller/comments")
const verifyJwtToken = require("../middlewares/verifyJwtToken")
const upload = require("../middlewares/postImagesUpload")
const router = express.Router();

//route GET /post
router.get("/", verifyJwtToken, PostsController.getList);
router.get("/:id", verifyJwtToken, PostsController.getOne);
//route GET pour avoir tout les posts d'un user grâce à son ID /post/user/:userId
router.get("/user/:userId", verifyJwtToken, PostsController.getListByUser);
//route POST /post
router.post("/", verifyJwtToken, upload.single("image"), PostsController.add);
//route POST d'un commentaire /post/:id
router.post("/:id", verifyJwtToken, CommentsController.add)
//route POST pour les likes /post/like/:id
router.post("/like/:id", verifyJwtToken, PostsController.like);
//route DELETE d'un post /post/id
router.delete("/:id", verifyJwtToken, PostsController.delete);
//route DELETE d'un commentaire /post/id/commentId
router.delete("/:id/:commentId", verifyJwtToken, CommentsController.delete)
//route UPDATE /post/id
router.put("/:id", verifyJwtToken, upload.single("image"), PostsController.modify);
//route UPDATE readBy pour marqué un post comme lu /post/:id
router.put("/readby/:id", verifyJwtToken, PostsController.updateReadBy);
module.exports = router;
