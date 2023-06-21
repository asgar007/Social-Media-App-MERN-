const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    picturePath: {
        type: String,
        default: ""
    },
    friends: [{ type: String }],
    location: String,
    occupation: String,
    viewedProfile: Number,
    impression: Number
}, {
    timestamps: true  // to create 2 more fields createdAt and UpdatedAT
});

const User = mongoose.model('User', userSchema);
module.exports = User;