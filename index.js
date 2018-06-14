const fs = require('fs');
const zlib = require('zlib');

function gunzip(src, target) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(src) === false)
            reject(new Error("File doesn't exist!"));

        try {
            const srcStream = fs.createReadStream(src);
            const targetStream = fs.createWriteStream(target);

            srcStream.pipe(zlib.createGunzip()).pipe(targetStream);

            targetStream.on('close', resolve);
        } catch (e) {
            reject(e);
        }
    });
}

module.exports = gunzip;
