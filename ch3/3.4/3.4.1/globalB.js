const A = require('./globalA');

// B 에서 message값 넣었지만
global.message = 'HI';

// A에서 적용되어 호출된다.
console.log(A());