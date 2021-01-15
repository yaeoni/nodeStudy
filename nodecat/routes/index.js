const express = require('express');
const axios = require('axios');

const router = express.Router();
const URL = 'http://127.0.0.1:8081/v1';
axios.defaults.headers.origin = 'http://127.0.0.1:4000';


// API에 요청 보내는 함수
const request = async (req, api)=>{
    try{
        if(!req.session.jwt){
            const tokenResult = await axios.post(`${URL}/token`, {
                clientSecret : process.env.CLIENT_SECRET,
            });
            req.session.jwt = tokenResult.data.token;
        }
        return await axios.get(`${URL}${api}`, {
            headers : { authorization : req.session.jwt},
        });
    }catch(err){
        if(err.response.status === 419){
            delete req.session.jwt;
            return request(req, api);
        }
        return err.response;
    }
};

// API를 활용해 자신이 작성한 포스트를 가져오는 라우터
router.post('/mypost', async(req, res, next)=>{
    try{
        const result = await request(req, '/posts/my');
        res.json(result.data);
    }catch(err){
        console.error(err);
        next(err);
    }
});

//해시태그 검색
router.get('/search/:hashtag', async(req, res, next)=>{
    try{
        const result = await request(
            req, `/posts/hashtag/${encodeURIComponent(req.params.hashtag)}`,
        );
        res.json(result.data);
    }catch(err){
        if(err.code){
            console.error(err);
            next(err);
        }
    }
});

module.exports = router;