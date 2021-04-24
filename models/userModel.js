const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    teams:{
        type: [String],
        required: false,
    },
    verified:{
        type: Boolean,
        required: false,
    },
    superuser:{
        type: Boolean,
        required: false,
    }
},  { timestamps: true });

const User =  mongoose.model("user", userSchema);

module.exports = User;