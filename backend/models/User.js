const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        index: true,
        lowercase: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: true,
        max: 32,
        unique: true,
        lowercase: true,
    },
    profile: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },

    salt: Number,
    about: {
        type: String,
    },
    role: {
        type: Number,
        trim: true,
    },
    photo: {
        data: Buffer,
        contentType: string,
    },
    resetPasswordLink: {
        data: String,
        default: "",
    },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);