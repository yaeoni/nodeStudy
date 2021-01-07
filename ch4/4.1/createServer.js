const http = require('http');

/*  인자 : 요청에 대한 콜백 함수
 *  요청이 들어올 때마다 매번 콜백 함수가 실행된다.

  * writeHead = 응답에 대한 정보 기록
  * write = 클라이언트로 보낼 데이터
  * end = 응답 종료 메서드
  * 
  * 브라우저는 응답 내용을 받아서 렌더링한다.  */

http.createServer((req, res)=>{

    res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
    res.write('<h1>Hello!</h1>');
    res.end('<p>hello server!</p>');
})
    .listen(8080, ()=>{
        //서버는 8080포트에서 요청이 오기를 기다린다.
        console.log('8080에서 서버 연결 중입니다!');
    })