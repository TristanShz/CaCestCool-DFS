const express = require('express')
const PostsController = require("../controller/posts.js")
const CommentsController = require("../controller/comments")
const upload = require("../middlewares/uploadFile")
const router = express.Router();

//route GET /post
router.get("/", PostsController.getList);
router.get("/:id", PostsController.getOne);
//route POST /post
router.post("/",upload.single("image"), PostsController.add);
router.post("/:id", CommentsController.add)

//route DELETE /post/id
router.delete("/:id");
router.delete("/:id/:commentId", CommentsController.delete)
//route UPDATE /post/id
router.put("/:id", PostsController.modify);

module.exports = router;
