const mongoose = require('mongoose')
const User = require('./User')
const {Schema} = mongoose;

const commentsSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: User,
            required: true,
        },
        content: {
            type: String,
            minLength: 1,
            maxLength: 280,
            required: true,
        },
    },
    {
        timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
    }
)
const postSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: User,
            required: true,
        },
        title: {
            type: String,
            minLength: 1,
            maxLength: 100,
            required: true,
        },
        description: {
            type: String,
            minLength: 1,
            maxLength: 1500,
            required: true,
        },
        image: {
            type: String,
            required: false,
        },
        likes: {
            type: [Schema.Types.ObjectId],
            ref: User,
            required: false,
        },
        comments: {
            type: [commentsSchema],
            required: false,
        },
        readBy: {
            type: [Schema.Types.ObjectId],
            ref: User,
            required: false,
        },

    },
    {
        timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
    })

module.exports = mongoose.model('Post', postSchema);
