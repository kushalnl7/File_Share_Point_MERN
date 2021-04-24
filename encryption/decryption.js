var fs = require('fs');
var tar = require('tar');
var crypto = require('crypto');
const sharedSecret = "mypasswordmypasswordmypasswordmy";
const initializationVector = crypto.randomBytes(16);
var decryptor = crypto.createDecipheriv('aes-256-cbc', sharedSecret, initializationVector);

// /home/kushal/SEM 6/SE/server/Uploads/6e76b07d-cf86-420f-86f6-e4a0f2b65e15.tgz.enc

function decrypt(filename, uuid, name) {

    var extractor = tar.x({
        trim: 1,
        'C': `raw_decryption`,
        'cwd': `${__dirname}/../Uploads`,
    })
    fs.createReadStream(filename).pipe(decryptor).pipe(extractor);
    // fs.rename(`/home/kushal/SEM 6/SE/server/Uploads/${uuid}/${name}`, `/home/kushal/SEM 6/SE/server/Uploads/${name}`, function(err){
    //     if(err){
    //         console.log('Error:', err);
    //     }
    //     else{
    //         console.log('done');
    //     }
    // })
    return true;
}

module.exports = decrypt;
