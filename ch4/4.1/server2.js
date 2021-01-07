const http = require('http');

/*  listen 메서드에 콜백 함수를 넣는 대신에 서버에 Listening 이벤트 붙여줘도 된다. 
 *  HTML 파일을 만들어두고 서버로 보내기 */

const fs = require('fs').promises;

const server = http.createServer(async (req, res)=>{
    try{
        const data = await fs.readFile('./server2.html');
        res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
        res.end(data);
    }catch(err){
        console.log(err);
        res.end(err.message);
    }
});
server.listen(8080);

server.on('listening', ()=>{
    console.log('8080 포트에서 서버 요청 대기여요!');
});
server.on('error', (err)=>{
    console.error(err);
});