const fs = require('fs');

const readStream = fs.createReadStream('./read2.txt');
const writeStream = fs.createWriteStream('./write.txt');
readStream.pipe(writeStream);