const express = require('express')
const UsersController = require("../controller/users.js")
const upload = require('../middlewares/userImagesUpload')
const verifyJwtToken = require("../middlewares/verifyJwtToken")
const router = express.Router();

//route GET /users
router.get("/", verifyJwtToken, UsersController.getList);
router.get("/:id", verifyJwtToken, UsersController.getOne);
//route POST /users
router.post("/", UsersController.add);
//route POST pour le login d'un user /users/login
router.post("/login", UsersController.login);
//route POST pour le check du token /users/token
router.post("/token", UsersController.checkToken);
//route DELETE /users/id
router.delete("/:id", verifyJwtToken, UsersController.delete);
//route UPDATE /users/id
router.put("/:id", verifyJwtToken, upload.single("image"), UsersController.modify);
//route UPDATE password /users/password/:userId
router.put("/password/:userId", verifyJwtToken, UsersController.modifyPassword);

module.exports = router;
