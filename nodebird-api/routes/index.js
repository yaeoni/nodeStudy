/* 도메인 등록 화면, 로그인 안했으면 로그인 창부터 뜬다 */
const express = require('express');

// 패키지의 변수나 함수 가져올 때 이름 바꿀 수 있음. 여기서는 v4 -> uuid 로
const { v4:uuidv4 } = require('uuid');

const { User, Domain } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next)=>{
    try{
        const user = await User.findOne({
            where : { id: req.user && req.user.id || null},
            include : { model : Domain },
        });
        res.render('login', {
            user,
            domains: user&&user.Domains,
        });
        console.log("user info : ", user);
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/domain', isLoggedIn, async (req, res, next)=>{
    try{
        await Domain.create({
            UserId : req.user.id,
            host : req.body.host,
            type : req.body.type,
            clientSecret : uuidv4(),
        });
        res.redirect('/');
    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;