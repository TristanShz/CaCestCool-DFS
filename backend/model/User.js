const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        fullName: {
            type: String,
            minLength: 3,
            maxLength: 30,
            required: true
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        profilPicture: {
            type: String,
            required: false,
        },
        defaultColor: {
            type: String,
            default: () => {
                const colorList = [
                    "#97BBFC",
                    "#FC81BF",
                    "#2872FA",
                    "#FACB64",
                    "#73FA73",
                    "#B0ACFC"
                ];
                return colorList[Math.floor(Math.random()*6)];
            }
        }
    },
    {
        timestamps: { createdAt: 'created_at'}
    })
userSchema.methods.getPassword = function(){
    return "hello";
}
module.exports = mongoose.model("User", userSchema)