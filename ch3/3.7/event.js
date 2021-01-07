const EventEmitter = require('events');

const myEvent = new EventEmitter();

myEvent.addListener('event1', ()=>{
    console.log('event 1');
});

myEvent.on('event2', ()=>{
    console.log('이벤트 2');
});

myEvent.on('event2', ()=>{
    console.log('이벤트 2 추가 ');
});

//once -> 한 번만 실행됨
myEvent.once('event3', ()=>{
    console.log('이벤트 3');
});

myEvent.emit('event1');
myEvent.emit('event2');

myEvent.emit('event3');
myEvent.emit('event3'); //Once로 설정되어 있어서 실행 안된다.

console.log(myEvent.listenerCount('event2'));


