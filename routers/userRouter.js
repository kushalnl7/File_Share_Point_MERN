const router = require("express").Router();
const Team = require("../models/teamModel");
const User = require("../models/userModel");
const File = require("../models/fileModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try{
        const { firstname, lastname, dob, mobile, email, password } = req.body;

        const existingEmail = await User.findOne({email});
        if(existingEmail){
            return res.send("Account with this email already exists.");
        }
        const existingMobile = await User.findOne({mobile});
        if(existingMobile){
            return res.send("Account with this mobile number already exists.");
        }

        // Password Hashing
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt);

        //Setup new user account
        const newUser = new User({
            firstname, lastname, dob, mobile, email, password: passwordHash, verified: false, superuser: false
        });
        const savedUser = await newUser.save();
        console.log("User Saved");

        // JWT Token
        const token = jwt.sign({
            user: savedUser._id
        }, process.env.JWT_SECRET);

        // Send Cookie
        res.send("Registration Successful! You can login after your profile gets verified by admin.");

    }
    catch(err){
        console.error(err);
        res.status(500).send();    
    }
});

router.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.send("User doesn't exist!");
        }
        
        // Validate Password
        const passwordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!passwordCorrect){
            return res.send("Wrong Password!");
        }
        if(existingUser.verified === false){
            return res.send("User not verified!");
        }
        // JWT Token
        const token = jwt.sign({
            user: existingUser._id
        }, process.env.JWT_SECRET);

        console.log("Login Successful");

        // Send Cookie
        res.cookie("token", token, {
            httpOnly: true, 
        }).send("Login Successful!");

    }
    catch(err){
        console.error(err);
        res.status(500).send("Internal server error");    
    }
});

router.get("/logout", (req, res) => {
    console.log("Logging Out");
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date()
    }).send("Logout Successful");
});

router.get("/loggedIn", (req, res) => {
    try{
        console.log("LoggedIn bollean request");
        const token = req.cookies.token;
        if(!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token Verified");
        res.json(true);
    }
    catch(err){
        res.json(false);
    }
});

router.get("/superuser", async (req, res) => {
    try{
        console.log("superuser bollean request");
        const token = req.cookies.token;
        if(!token) return res.json(false);
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.user;
        const user = await User.findById({_id: userId});
        // console.log(user.superuser);
        if(user.superuser === true){
            // console.log(true);
            res.json(true);
        }
        else{
            // console.log(false); 
            res.json(false);
        }
    }
    catch(err){
        res.json(false);
    }
});


router.get('/leaveteam/:_id', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        await Team.findOneAndUpdate({_id: req.params._id},{
            $pull: {
                teammembers: owner_id
            }
        });
        await User.findOneAndUpdate({_id: owner_id}, {
            $pull: {
                teams: req.params._id
            }
        });
        res.json("Team left successfully!");
      }
      catch(err){
          console.error(err);
          res.status(500).send(); 
      }
})

router.get('/getuser', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const user = await User.findById({_id: owner_id});
        res.json(user);
      }
      catch(err){
          console.error(err);
          res.status(500).send(); 
      }
})

router.get('/deleteuser', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const usert = await User.findById({_id: owner_id});
        for(var i = 0; i < usert.teams.length; i++){
            const team = await Team.findOneAndUpdate({_id: usert.teams[i]}, {
                $pull:{
                    teammembers: owner_id
                }
            });
        }
        const user = await User.deleteOne({_id: owner_id});
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date()
        }).send("User deleted successfully!");
      }
      catch(err){
          console.error(err);
          res.status(500).send(); 
      }
})

router.post("/editprofile", async (req, res) => {
    try{
        console.log("request came");
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const { firstname, lastname, dob, mobile, email} = req.body;
        console.log(firstname, lastname, dob, mobile, email);
        await User.findOneAndUpdate({_id: owner_id}, {
            $set:{
                firstname: firstname, 
                lastname: lastname, 
                dob: dob, 
                mobile: mobile, 
                email: email
            }
        });

        res.json("Profile updated successfully!")
    }
    catch(err){
        console.error(err);
        res.status(500).send();    
    }
});

router.get('/getnooffiles', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const val = await File.find({user: owner_id});
        res.json(val.length);
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})


router.get('/getuserrequests', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const users = await User.find({});
        res_members = [];
        for(var i = 0; i < users.length; i++){
            if(users[i].verified === false){
                res_members.push(users[i]);
            }
        }
        res.json(res_members);
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})

router.post('/grantuseraccess', async (req, res) => {
    try{
        const token  = req.cookies['token'];
        if(!token){
            return res.json({ error: 'User not logged in.' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const owner_id = decodedToken.user;
        const userdata = req.body;
        const emailTo = []
        for(var i = 0; i < userdata.length; i++){
            await User.findOneAndUpdate({_id: userdata[i]._id},{
                $set:{
                    verified: true
                }
            });
        }
        for(var i = 0; i < userdata.length; i++){
            const user = await User.findById({_id: userdata[i]._id});
            if(user){
                emailTo.push(user.email);
            }
        }
        const sendMail = require('../services/emailService');
        sendMail({
            from: "kushalnl2000@gmail.com",
            to: emailTo,
            subject: 'File Sharing System',
            text: `kushalnl2000@gmail.com verified your account on File Share Point`,
            html: require('../services/confirmTemplate')()
        })
        res.send("Access granted successfully!");
    }
    catch(err){
        console.error(err);
        res.status(500).send(); 
    }
})


module.exports = router;