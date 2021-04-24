const router = require("express").Router();
const User = require("../models/userModel");
const Team = require("../models/teamModel");
const File = require("../models/fileModel");
const jwt = require("jsonwebtoken");
const { response } = require("express");

router.post('/add', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const { teamname, description, teamtype, teamvisibility } = req.body;
        const existingUser = await User.findOne({_id:owner_id});
        const newTeam = new Team({
            teamname, owner_id, description, teamtype, teamvisibility
        });
        const savedTeam = await newTeam.save();
        console.log("Team successfully registered!");
        return res.json({savedTeam, msg: 'Team successfully registered!'});
    }
    catch(err){
        console.error(err);
        res.status(500).send();    
    }
});

router.get('/myteams', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const myteams = await Team.find({owner_id});
        // console.log(myteams);
        res.json(myteams);
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

router.get('/getteam/:_id', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const team = await Team.findById({_id: req.params._id});
        res.json(team);
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

router.get('/addmembers/:_id', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const team = await Team.findById({_id: req.params._id});
        const users = await User.find({});
        // console.log(team, users);
        res_members = [];
        for(var i = 0; i < users.length; i++){
            if((users[i]._id).toString() !== team.owner_id && (team.teammembers).includes(users[i]._id) === false){
                // console.log((users[i]._id).toString(), team.owner_id)
                res_members.push(users[i]);
            }
        }
        // console.log(res_members);
        res.json(res_members);
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})


router.get('/getmembers/:_id', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const team = await Team.findById({_id: req.params._id});
        const users = await User.find({});
        // console.log(team, users);
        res_members = [];
        for(var i = 0; i < users.length; i++){
            if((team.teammembers).includes(users[i]._id) === true){
                res_members.push(users[i]);
            }
        }
        // console.log(res_members);
        res.json(res_members);
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

router.post('/updateteam/:_id', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const userdata = req.body;
        // console.log(req.body);
        for(var i = 0; i < userdata.length; i++){
            await Team.findOneAndUpdate({_id: req.params._id},{
                $addToSet: {
                    teammembers: userdata[i]._id
                },
                $pull:{
                    teamrequest: userdata[i]._id
                }
            });
        }
        for(var i = 0; i < userdata.length; i++){
            await User.findOneAndUpdate({_id: userdata[i]._id}, {
                $addToSet: {
                    teams: req.params._id
                }
            });
        }
        res.send("Members added to team successfully!");
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

router.post('/deletemember/:_id', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const userdata = req.body;
        // console.log(req.body);
        for(var i = 0; i < userdata.length; i++){
            await Team.findOneAndUpdate({_id: req.params._id},{
                $pull: {
                    teammembers: userdata[i]._id
                }
            });
        }
        for(var i = 0; i < userdata.length; i++){
            await User.findOneAndUpdate({_id: userdata[i]._id}, {
                $pull: {
                    teams: req.params._id
                }
            });
        }
        res.send("Members deleted successfully");
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

router.get('/getnooffiles/:_id', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }
        const val = await File.find({team: req.params._id});
        res.json(val.length);
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

router.get('/delete/:_id', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }
        const team = await Team.findById({_id: req.params._id})
        for(var i = 0; i < team.teammembers.length; i++){
            const user = await User.findOneAndUpdate({_id: team.teammembers[i]},{
                $pull: {
                    teams: req.params._id
                }
            });
        }
        await Team.findOneAndDelete({_id: req.params._id});
        console.log("Team deleted");
        res.json("Team deleted successfully!");
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

router.get('/getowner/:_id', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }
        const team = await Team.findById({_id: req.params._id});
        const user = await User.findById({_id: team.owner_id});
        res.json(user);
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

router.post("/editteamprofile/:_id", async (req, res) => {
    try{
        console.log("request came");
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const { teamname, description} = req.body;
        await Team.findOneAndUpdate({_id: req.params._id}, {
            $set:{
                teamname,
                description
            }
        });

        res.json("Team has been updated successfully!")
    }
    catch(err){
        console.error(err);
        res.status(500).send();    
    }
});

router.get('/reqteamaccess/:_id', async (req, res) => {
    try{
        console.log("Access Requested");
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        await Team.findOneAndUpdate({_id: req.params._id},{
            $addToSet: {
                teamrequest: owner_id
            }
        });
        res.send("Team access requested!");
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

router.get('/deleterequests/:_id', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        await Team.findOneAndUpdate({_id: req.params._id},{
            $set: {
                teamrequest: []
            }
        });
        res.send("Denied all requests successfully!");
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

router.get('/getrequests/:_id', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const team = await Team.findById({_id: req.params._id});
        const users = await User.find({});
        // console.log(team, users);
        res_members = [];
        for(var i = 0; i < users.length; i++){
            if((team.teamrequest).includes(users[i]._id) === true){
                res_members.push(users[i]);
            }
        }
        // console.log(res_members);
        res.json(res_members);
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})


module.exports = router;