const router = require("express").Router();
const File = require("../models/fileModel");
const decrypt = require("../encryption/decryption");

router.get("/:uuid", async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid});
        if(!file){
            return res.send("File not found on server. Please contact owner!");
        } 
        // console.log(Date.now() - file.createdAt.getTime()/(1000*60*60));
        // console.log(file.timelimit);
        if((Date.now() - file.createdAt.getTime())/(1000*60*60) < file.timelimit){
            return res.send({
                uuid: file.uuid,
                fileName: file.displayname,
                fileSize: file.size,
                timeLimit: file.timelimit,
                downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
            })
        }
        else{
            return res.send("The time limit to download this file has been over. Please contact the owner!")
        }
    } catch(err){
            return res.send("Something went wrong");
    }
})

router.get("/download/:uuid", async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid});
        if(!file){
            return res.render('download', {error: "Link has been expired"});
        }
        // var flag = false; 
        // const flag = decrypt(`${__dirname}/../${file.path}.tgz.enc`, req.params.uuid, file.filename);
        const filePath = `${__dirname}/../${file.path}`;
        if((Date.now() - file.createdAt.getTime())/(1000*60*60) < file.timelimit){
            res.download(filePath);
        }
        else{
            res.send("404 Not Found");
        }

    } catch(err){
            return res.render('download', {error: "Something went wrong"});
    }
})

module.exports = router;