const User = require("../model/User.js");
const bcrypt = require('bcrypt');
const fs = require("fs");
const path = require("path");

exports.hashPassword = (password) => {
    const SALT_ROUNDS = 10;
    return bcrypt.hash(password, SALT_ROUNDS);
}
exports.comparePasswords = (plainTextPass, hashPass) => {
    return bcrypt.compare(plainTextPass, hashPass);
}
exports.add = (user) => {
    const newUser = new User(user);
    return newUser.save();
}
exports.delete = (id) => {
    return User.deleteOne({_id: id});
}
exports.getUsers = () => {
    return User.find({});
}
exports.getOne = (user) => {
    if (user.id) return User.findOne({_id: user.id}).exec();
    if (user.email) return User.findOne({email: user.email}).exec();
}
exports.getPassword = async (id) => {
    const user = await User.findOne({_id: id}).select("password").exec();
    return user.password;
}
exports.modify = async (id, user, removeProfilPic) => {
    const userToModify = await User.findOne({_id: id}).exec();
    if (removeProfilPic) {
        const uploadsFile = fs.readdirSync(path.join(__dirname, "../../src/assets/userImages"));
        if (uploadsFile.includes(userToModify.profilPicture)) {
            fs.unlinkSync(
                path.join(__dirname, "../../src/assets/userImages", userToModify.profilPicture)
            );
        }
    }
    return User.updateOne({_id: id}, user);
}

exports.modifyPassword = async (id, newPassword) => {
    return User.updateOne({_id: id}, {password: newPassword});
}
exports.setLastConnection = (id) => {
    return User.updateOne({_id: id}, {lastConnection: Date.now()});
}
