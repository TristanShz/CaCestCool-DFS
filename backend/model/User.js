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
        }
    },
    {
        timestamps: { createdAt: 'created_at'}
    })

module.exports = mongoose.model("User", userSchema)