const User = require("../model/User.js");
const bcrypt = require('bcrypt');

    exports.hashPassword = (password) =>{
        const SALT_ROUNDS = 10;
        return bcrypt.hash(password, SALT_ROUNDS);
    }
    exports.comparePasswords= async (plainTextPass, hashPass) =>{
        return await bcrypt.compare(plainTextPass, hashPass);
    }
    exports.add = (user) =>{
        const newUser = new User(user);
        return newUser.save();
    }
    exports.delete = (id) => {
        return User.deleteOne({_id: id});
    }
    exports.getUsers = () =>{
        return User.find({});
    }
    exports.getOne = (id) => {
        return User.findOne({_id: id});
    }
    exports.modify = (id,user) => {
        return User.updateOne({_id: id}, user);
    }