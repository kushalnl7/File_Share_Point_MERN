const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../models/fileModel");
const Team = require("../models/teamModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { v4: uuid4 } = require("uuid");
const fs = require('fs');
const encrypt = require('../encryption/encryption')


let storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, "Uploads/"),
    filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        callback(null, uniqueName);
    }
})

let upload = multer({
    storage,
    limits: { fileSize: 1000000 * 100 },
}).single('myfile');

router.post('/', (req, res) => {

    upload(req, res, async (err) => {
        const token = req.cookies['token'];
        if (!token) {
            return res.json({ msg: 'User not logged in.' });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.user;
        const user = await User.findById({_id: userId});
        if (!req.file) {
            return res.json({ msg: 'No file chosen!' });
        }

        if (err) {
            return res.json({ msg: err.message });
        }
        const uuid = uuid4();
        const file = new File({
            filename: req.file.filename,
            displayname: req.body.displayname,
            timelimit: req.body.timelimit,
            user: userId,
            uuid: uuid,
            path: req.file.path,
            size: req.file.size,
            sender: user.email
        });

        const response = await file.save();
        return res.send({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}`, uuid: uuid, msg: 'File uploaded successfully!'});

    });

})

router.post('/team/:_id', (req, res) => {

    // Storing File

    upload(req, res, async (err) => {
        const token = req.cookies['token'];
        if (!token) {
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.user;
        // console.log(req);

        if (!req.file) {
            return res.json({ msg: 'No file chosen!' });
        }

        if (err) {
            return res.json({ msg: err.message });
        }

        // Update Database 
        const uuid_gen = uuid4();
        const filename_gen = req.file.filename;
        const file = new File({
            filename: req.file.filename,
            displayname: req.body.displayname,
            timelimit: 24,
            team: req.params._id,
            uuid: uuid_gen,
            path: req.file.path,
            size: req.file.size,
            sender: "kushalnl2000@gmail.com"
        });

        const response = await file.save();

        // try {
        //     fs.mkdirSync(`${__dirname}/../raw_encryption/${uuid_gen}`)
        //     // console.log("done mkdir");
        // }
        // catch (err) {
        //     console.log("Folder cannot be created", err);
        // }

        // try {
        //     fs.renameSync(`${__dirname}/../Uploads/${req.file.filename}`, `${__dirname}/../raw_encryption/${uuid_gen}/${req.file.filename}`);
        //     // console.log("done rename");
        // }
        // catch (err) {
        //     console.log("File cannot be moved", err);
        // }
        // try{
        //     const enc = await encrypt([`${uuid_gen}`], uuid_gen, filename_gen);
        //     console.log(enc);
        // }
        // catch(err) {
        //     console.log("Encrption failed!", err);
        // }

        return res.send({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}`, uuid: uuid_gen, msg: 'File uploaded successfully!'});

    });

})

router.post("/send", async (req, res) => {
    const token = req.cookies['token'];
    if (!token) {
        return res.json({ msg: 'User not logged in.' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.user;
    const user = await User.findById({_id: userId});
    const { uuid, emailTo } = req.body;
    if (!uuid || !emailTo) {
        res.send("Enter valid mail-id");
    }

    const file = await File.findOne({ uuid: uuid });
    const sendMail = require('../services/emailService');
    sendMail({
        from: "kushalnl2000@gmail.com",
        to: emailTo,
        subject: 'File Share Point',
        text: `${user.firstname} ${user.lastname} shared a file with you.`,
        html: require('../services/emailTemplate')({
            emailFrom: `${user.firstname} ${user.lastname}`,
            downloadLink: `${process.env.REACT_APP_URL}/download/${uuid}`,
            size: parseInt(file.size / 1000) + ' KB',
            expires: `${file.timelimit} hours`
        })
    })

    return res.send("Mail sent successfully!");
})

router.post("/send/team/:_id", async (req, res) => {
    const { uuid } = req.body;
    // console.log(req.body, uuid);
    if (!uuid) {
        res.status(422).send({ error: "All fields are required." });
    }

    const file = await File.findOne({ uuid: uuid });
    const team = await Team.findById({ _id: req.params._id });
    const owner = await User.findById({ _id: team.owner_id });
    const users = await User.find({});
    members = [];
    for (var i = 0; i < users.length; i++) {
        if ((team.teammembers).includes(users[i]._id) === true) {
            members.push(users[i].email);
        }
    }

    const sendMail = require('../services/emailService');
    sendMail({
        from: "kushalnl2000@gmail.com",
        to: members,
        subject: 'File Share Point',
        text: `${owner.firstname} ${owner.lastname} shared a file with team ${team.teamname}`,
        html: require('../services/emailTemplate')({
            emailFrom: `${owner.firstname} ${owner.lastname}`,
            downloadLink: `${process.env.REACT_APP_URL}/download/${uuid}`,
            size: parseInt(file.size / 1000) + ' KB',
            expires: `${file.timelimit} hours`
        })
    })

    return res.send({ success: true });
})

module.exports = router;