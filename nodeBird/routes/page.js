const express = require('express');

//로그인 관련 미들웨어
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
// 메인 페이지에서 게시글 함께 로딩
const { Post, User, Hashtag } = require('../models');


const router = express.Router();

router.use((req, res, next)=>{
    res.locals.user = req.user;

    // 팔로잉, 팔로워 숫자와 팔로우 버튼 표시
    res.locals.followerCount = req.user? req.user.Followers.length : 0;
    res.locals.followingCount = req.user? req.user.Followings.length : 0;
    res.locals.followerIdList = req.user? req.user.Followings.map(f=>f.id): [];
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

// DB에서 게시글 조회하고, 결과는 twits에 넣어 렌더링
router.get('/', async (req, res, next)=>{
    try{
        const posts = await Post.findAll({
            // 글 작성자의 아이디와 닉네임을 join해서 적용, 순서는 최신순
            include: {
                model:User,
                attributes : ['id', 'nick'],
            },
            order : [['createdAt', 'DESC']],
        });
        res.render('main', {
            title:'NodeBBBIrd',
            twits:posts,
        });
    } catch(err){
        console.error(err);
        next(err);
    }
});

// 해시 태그로 조회
router.get('/hashtag', async(req, res, next)=>{
    const query = req.query.hashtag;
    if(!query){
        return res.redirect('/');
    }
    try{
        const hashtag = await Hashtag.findOne({where : {title : query}});
        let posts = [];
        if(hashtag){
            posts = await hashtag.getPosts({ include : [{model :User}]});
        }

        // 조회 후에 메인으로 렌더링 하면서 전체 게시글 대신 조회된 게시글만 트윗에 넣겠다.
        return res.render('main', {
            title : `${query} | Nodebird`,
            twits : posts,
        });
    }catch(err){
        console.error(err);
        return next(err);
    }
});

module.exports = router;