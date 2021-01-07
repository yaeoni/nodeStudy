/* cookie의 식별 */
const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');
const { Http2ServerResponse } = require('http2');

/* 쿠키 문자열을 자바스크립트 객체 형식으로 바꾸는 함수(문자열->객체) */
const parseCookies = (cookie='')=>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) =>{
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});
    
http.createServer(async (req, res)=>{
    const cookies = parseCookies(req.headers.cookie);

    // 주소가 /login으로 시작할 때
    /* 각각 주소와 주소에 딸려오는 쿼리를 분석 */
    if(req.url.startsWith('/login')){
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();

        //쿠키 유효 시간을 현재 시간 + 5분으로 설정하기 + 쿠키를 함께 보내기
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location: '/',
            'Set-Cookie' : `name=${encodeURIComponent(name)}; Expires = ${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    }else if(cookies.name){
        //name이라는 쿠키가 있는 경우
        res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하셔요?!`);
    }else{
        try{
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'});
            res.end(data);
        }catch(err){
            res.writeHead(200, { 'Content-Type' : 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
})
    .listen(8080, ()=>{
        console.log("8080 wait이여요");
    })