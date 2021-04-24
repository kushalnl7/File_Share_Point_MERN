const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    filename:{
        type: String,
        required: true,
    },
    displayname:{
        type: String,
        required: false,
    },
    timelimit:{
        type: Number,
        required: false,
    },
    user:{
        type: String,
        required: false,
    },
    team:{
        type: String,
        required: false,
    },
    path:{
        type: String,
        required: true,
    },
    size:{
        type: Number,
        required: true,
    },
    uuid:{
        type: String,
        required: true,
    },
    sender:{
        type: String,
        required: false,
    },
    receiver:{
        type: String,
        required: false,
    },
}, { timestamps: true });

const File =  mongoose.model("file", fileSchema);

module.exports = File;