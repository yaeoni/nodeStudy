const util = require('util');
const crypto = require('crypto');

const dontUse = util.deprecate((x,y)=>{
    console.log(x+y);
}, 'dontUse는 곧 안써요 쓰지마요');
dontUse(1,2);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
    .then((buf)=>{
        console.log(buf.toString('base64'));
    })
    .catch((err)=>{
        console.log(err);
    })