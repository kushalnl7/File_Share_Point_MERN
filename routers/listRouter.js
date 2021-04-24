const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const File = require("../models/fileModel");
const Team = require("../models/teamModel");


router.get('/allusers', async (req, res) => {
    await User.find({}, function(err, users) {
        var userMap = {};
    
        users.forEach(function(user) {
          userMap[user._id] = user;
        });
        // console.log(userMap);
        console.log(users);
        res.json(users);  
      });
});

router.get('/getteams', async (req, res) => {
  try{
      const token  = req.cookies['token'];
      if(!token){
          return res.json({ error: 'User not logged in.' });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const owner_id = decodedToken.user;
      const user = await User.findById({_id: owner_id});
      // console.log(user.teams);
      const teams_list = [];
      for(var i = 0; i < user.teams.length; i++){
        const team = await Team.findById({_id: user.teams[i]});
        if(team){
          teams_list.push(team);
        }
      }
      res.json(teams_list);
  }
  catch(err){
      console.error(err);
      res.status(500).send(); 
  }
})

router.get('/getuserfiles', async (req, res) => {
  try{
    const token  = req.cookies['token'];
    if(!token){
        return res.json({ error: 'User not logged in.' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const owner_id = decodedToken.user;
    const files_user = await File.find({user: owner_id});
    res.json(files_user);
  }
  catch(err){
      console.error(err);
      res.status(500).send(); 
  }
})

router.get('/getteamfiles/:_id', async (req, res) => {
  try{
    const token  = req.cookies['token'];
    if(!token){
        return res.json({ error: 'User not logged in.' });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const owner_id = decodedToken.user;
    const files_team = await File.find({team: req.params._id});
    res.json(files_team);
  }
  catch(err){
      console.error(err);
      res.status(500).send(); 
  }
})

router.get('/getpublicteams', async (req, res) => {
  try{
      const token  = req.cookies['token'];
      if(!token){
          return res.json({ error: 'User not logged in.' });
      }

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const owner_id = decodedToken.user;
      const teams_public = await Team.find({teamvisibility: "Public Team"});
      const teams_list = [];
      for(var i = 0; i < teams_public.length; i++){
        if(teams_public[i].owner_id !== owner_id && (teams_public[i].teammembers).includes(owner_id) === false && (teams_public[i].teamrequest).includes(owner_id) === false){
          teams_list.push(teams_public[i]);
        }
      }
      res.json(teams_list);
  }
  catch(err){
      console.error(err);
      res.status(500).send(); 
  }
})

module.exports = router;