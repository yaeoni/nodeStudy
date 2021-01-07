/* writeStream 도 동일하게 동작하긴함 ! */
const fs = require('fs');

// highwatermark = 버퍼의 크기를 정해줌 (바이트 단위)
const readStream = fs.createReadStream('./readme.txt', {highWaterMark:16});
const data = [];

// 나눠진 조각을 보통 chunk라고 불림
// readStream은 이벤트 리스너를 붙여서 사용,, data, end, error
readStream.on('data', (chunk)=>{
    data.push(chunk);
    console.log('data : ', chunk, chunk.length);
});

readStream.on('end', ()=>{
    console.log('end : ', Buffer.concat(data).toString());
});

readStream.on('error', (err)=>{
    console.log('err: ', err);
});