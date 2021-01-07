const path = require('path');

const string = __filename;

console.log('path.sep : ', path.sep);
console.log('path.delimiter : ', path.delimiter);
console.log('------------------------------');
console.log('path.dirname() : ', path.dirname(string));
console.log('path.extname() : ', path.extname(string));
console.log('path.basename() : ', path.basename(string));
console.log('path.basename - extname : ', path.basename(string, path.extname(string)))
console.log('------------------------------');
console.log('path.parse() : ', path.parse(string));
console.log('path.format() : ', path.format({
    dir: '/Users/yaeoni/Desktop/nodeStudy/ch3/3.5/3.5.2',
    name: 'path',
    ext: '.js'
}))
console.log('path.normalize() : ', path.normalize('////Users/yaeoni////Desktop/nodeStudy/ch3/3.5/3.5.2'));
console.log('------------------------------');
console.log('path.isAbsolute(C://) : ',path.isAbsolute('C://'));
console.log('------------------------------');
console.log('path.relative() : ', path.relative('/Users/yaeoni/Desktop/nodeStudy/ch3/3.5/3.5.2', '/Users'));
console.log('path.join() : ', path.join(__dirname, '..', '..', '/users', '.'));
console.log('path.resolve() : ', path.resolve(__dirname, '..', '..', 'yaewon'));