const userService = require("../services/users.js");

    exports.getList = async (req, res) => {
        try{
            const usersList = await userService.getUsers();
            res.status(200).json(usersList);
        }catch(e){
            res.status(400).send(e);
        }
    }
    exports.getOne = async (req, res) => {
        try{
            const user = await userService.getOne(req.params.id);
            res.status(200).send(user);
        }catch(e){
            res.status(400).send(e);
        }
    }
    exports.add = async (req, res) => {
        try{
            const password = await userService.hashPassword(req.body.password);
            const newUser = {
                fullName: req.body.fullName,
                email: req.body.email,
                password: password,
            };
            console.log(newUser);
            const user = await userService.add(newUser);
            res.status(200).send(user);
        }catch(e){
            console.log(e);
            res.status(400).send(e);
        }
    }
    exports.delete = async (req, res) => {
        try{
            const userDeleted = await userService.delete(req.params.id);
            res.status(200).send(userDeleted);
        }catch(e){
            res.status(400).json(e);
        }
    }
    exports.modify = async (req,res) => {
        try{
            console.log(req.body)
            const userModified = await userService.modify(req.params.id,req.body);
            if(userModified.modifiedCount === 1) return res.status(200).send(userModified);
            return res.status(400).send({message: "Aucun user trouver avec cet ID"})
        }catch(e){
            res.status(400).send(e);
        }
    }