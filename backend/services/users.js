const User = require("../model/User.js");
const bcrypt = require('bcrypt');

    exports.hashPassword = (password) =>{
        const SALT_ROUNDS = 10;
        return bcrypt.hash(password, SALT_ROUNDS);
    }
    exports.comparePasswords= (plainTextPass, hashPass) =>{
        return bcrypt.compare(plainTextPass, hashPass);
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
    exports.getOne = (user) => {
        if(user.id) return User.findOne({_id: user.id});
        if(user.email) return User.findOne({email: user.email});
    }
    exports.getPassword = async (id) => {
      const user = await User.findOne({_id: id}).select("password").exec();
      return user.password;
    }
    exports.modify = (id,user) => {
        return User.updateOne({_id: id}, user);
    }