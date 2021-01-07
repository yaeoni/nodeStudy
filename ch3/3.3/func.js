const { odd, even } = require('./var');

function check(num){
    if(num%2){
        return odd;
    }
    return even;
}

// 다른 모듈을 사용하는 파일을 다시 모듈로 만들 수 있음. 
module.exports = check;
