const jwt = require("jsonwebtoken");

function auth(req, res, next){
    try{
        const token = req.cookies.token;
        if(!token) return res.status(401).send("Unauthorised");

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified.user; //Doubtful

        next();
    }
    catch(err){
        console.error(err);
        res.status(401).send("Unauthorised");
    }
}

module.exports = auth;