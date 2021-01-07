console.log('require가 가장 위에 오지 않아도 괜찮다!');

module.exports = '나를 찾아보세용';

require('./var');

console.log('require cache : ', require.cache);
console.log('require main : ', require.main == module);
console.log(require.main.filename);
