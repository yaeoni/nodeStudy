// nextTick과 resolve된 promise들은 다른 콜백들보다 우선 실행됨 -> microtask라 불리움

setImmediate(()=>{
    console.log("immediate");
});

process.nextTick(()=>{
    console.log("nextTick");
});

setTimeout(()=>{
    console.log("timeout");
}, 0);

Promise.resolve().then(()=>console.log("promise"));