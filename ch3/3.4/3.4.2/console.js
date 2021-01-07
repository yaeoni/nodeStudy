const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
    outside:{
        inside:{
            key:'value',
        },
    },
}

console.time('same label');
console.error('에러는 여기에 담기')
console.table([{name:'yaewon', birth:1999}, {name:'hero', birth:1998, age:15}])
console.dir(obj, {colors: false, depth:2});
console.dir(obj, {colors: true, depth:5});

function b(){
    console.trace('에러 위치 추적')
}

function a(){
    b();
}
a();

console.timeEnd('same label');