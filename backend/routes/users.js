const express = require('express')
const UsersController = require("../controller/users.js")
const router = express.Router();

//route GET /users
router.get("/", UsersController.getList);
router.get("/:id", UsersController.getOne);
//route POST /users
router.post("/", UsersController.add);
router.post("/login", UsersController.login)
//route DELETE /users/id
router.delete("/:id", UsersController.delete);

//route UPDATE /users/id
router.put("/:id", UsersController.modify);

module.exports = router;
