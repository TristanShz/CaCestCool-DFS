const express = require('express')
const PostsController = require("../controller/posts.js")
const CommentsController = require("../controller/comments")
const verifyJwtToken = require("../middlewares/verifyJwtToken")
const upload = require("../middlewares/uploadFile")
const router = express.Router();

//route GET /post
router.get("/", PostsController.getList);
router.get("/:id", verifyJwtToken, PostsController.getOne);
//route POST /post
router.post("/",verifyJwtToken, upload.single("image"), PostsController.add);
router.post("/:id", verifyJwtToken, CommentsController.add)
router.post("/like/:id", verifyJwtToken, PostsController.like);
//route DELETE /post/id
router.delete("/:id", verifyJwtToken, PostsController.delete);
router.delete("/:id/:commentId", verifyJwtToken, CommentsController.delete)
//route UPDATE /post/id
router.put("/:id", verifyJwtToken, PostsController.modify);

module.exports = router;
