const express = require('express');

//로그인 관련 미들웨어
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.use((req, res, next)=>{
    res.locals.user = req.user;
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

// 자신의 정보는 로그인해야 볼 수 있음 -> isLoggedIn 사용
// isAuthenticate()가 true여어 Next로 넘어가서 (req, res) 메서드 실행
router.get('/profile',isLoggedIn, (req, res)=>{
    res.render('profile', {title:'내 정보 - nodeBirrrd'});
});

// 회원가입 페이지는 로그인 하지 않은 사람만 봐야함 -> isNotLoggedIn 사용
router.get('/join', isNotLoggedIn, (req, res)=>{
    res.render('join', {title : '회원 가입 - nodeBBBBiRD'});
});

router.get('/', (req, res, next)=>{
    const twits = [];
    res.render('main', {
        title: "NODE BIRD",
        twits,
    });
});

module.exports = router;