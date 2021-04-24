const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    teamname:{
        type: String,
        required: true,
    },
    owner_id:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: false,
    },
    teamtype:{
        type: String,
        required: false,
    },
    teamvisibility:{
        type: String,
        required: false,
    },
    teammembers:{
        type: [String],
        required: false,
    },
    teamrequest:{
        type: [String],
        required: false,
    }
}, { timestamps: true });

const Team =  mongoose.model("team", teamSchema);

module.exports = Team;