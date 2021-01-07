const {
    Worker, isMainThread, parentPort,
} = require('worker_threads');

// 현재 코드가 main 에서 실행되는지, 생성한 워커 스레드에서 실행되는 지 구분
if(isMainThread){
    //현재 파일을 워커 스레드에서 실행시키겠다. ( else 부분 )
    const worker = new Worker(__filename);

    // 워커에 데이터 보내기
    worker.on('message', message => console.log('from worker', message));
    worker.on('exit', ()=> console.log('worker exit'));
    worker.postMessage('ping');
}else{
    // 부모에게 데이터 받기
    parentPort.on('message', (value)=>{
        console.log('from parent', value);

        //부모에게 데이터 보내기
        parentPort.postMessage('pong');
        parentPort.close();
    });
}