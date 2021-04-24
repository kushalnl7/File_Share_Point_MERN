var fs = require('fs');
var tar = require('tar');
var crypto = require('crypto');
const sharedSecret = "mypasswordmypasswordmypasswordmy";
const initializationVector = crypto.randomBytes(16);
var encryptor = crypto.createCipheriv('aes-256-cbc', sharedSecret, initializationVector);

function encrypt(folder, name, filename) {
    var tar_name = `${filename}.tgz`; // the tar file name you want to give
    tar.c({
        'file': tar_name, 'cwd': `${__dirname}/../raw_encryption`
    }, folder).then(function() {
        var enc_writer = fs.createWriteStream(tar_name + '.enc');
        fs.createReadStream(tar_name).pipe(encryptor).pipe(enc_writer);
        fs.unlink(tar_name, function(err){
            if(err){
                console.log('error', err);
            }
            else{
                try {
                    fs.rename(`${__dirname}/../${tar_name}.enc`, `${__dirname}/../Uploads/${tar_name}.enc`, function(){
                        fs.unlink(`${__dirname}/../raw_encryption/${name}/${filename}`, function(){
                            fs.rmdir(`${__dirname}/../raw_encryption/${name}`, function(err){
                                if(err){
                                    console.log('Error: ', err);
                                }
                                else{
                                    console.log('done');
                                }
                            });
                        });
                    });
                }
                catch (err) {
                    console.log("File cannot be moved", err);
                }
                console.log('done');
            }
        });
        
    });
}

module.exports = encrypt;