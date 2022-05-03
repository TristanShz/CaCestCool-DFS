const express = require('express')
const UsersController = require("../controller/users.js")
const upload = require('../middlewares/userImagesUpload')
const router = express.Router();

//route GET /users
router.get("/", UsersController.getList);
router.get("/:id", UsersController.getOne);
//route POST /users
router.post("/", UsersController.add);
router.post("/login", UsersController.login);
router.post("/token", UsersController.checkToken);
//route DELETE /users/id
router.delete("/:id", UsersController.delete);

//route UPDATE /users/id
router.put("/:id", upload.single("image"), UsersController.modify);

module.exports = router;
