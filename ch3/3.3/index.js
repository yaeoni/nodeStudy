const { odd, even } = require('./var');
const check = require('./func');

function checkStr(str){
    if(str.length%2) return odd;
    return even;
}

console.log(check(10));
console.log(checkStr('hello'));