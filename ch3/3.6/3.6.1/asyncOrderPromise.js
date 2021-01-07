const fs = require('fs').promises;

console.log('시작');

fs.readFile('./readme.txt')
    .then((data)=>{
        console.log('1번', data.toString());
        return fs.readFile('./readme.txt');
    })
    .then((data=>{
        console.log('2번', data.toString());
        return fs.readFile('./readme.txt');
    }))
    .then((data=>{
        console.log('3번', data.toString());
        console.log("Promise로 sync-background")
    }))
    .catch((err)=>{
        console.log(err);
    });

console.log("Main thread is working");