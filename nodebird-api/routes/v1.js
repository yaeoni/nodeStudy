const express = require('express');
const jwt = require('jsonwebtoken');

const { verifyToken } = require('./middlewares');
const { Domain, User, Post, Hashtag } = require('../models');

const router = express.Router();

// 토큰 발급
router.post('/token', async(req, res)=>{
    const { clientSecret } = req.body;
    try{
        // 전달받은 클라이언트 비밀 키로 도메인 등록 되어 있는지 확인
        const domain = await Domain.findOne({
            where:{clientSecret},
            include:{
                model:User,
                attribute:['nick', 'id'],
            },
        });
        if(!domain){
            return res.status(401).json({
                code:401,
                message:"Unregistered Domain",
            });
        }

        // 토큰 발급하여 응답
        const token = jwt.sign({
            id:domain.User.id,
            nick:domain.User.nick,
        }, process.env.JWT_SECRET,{
            expiresIn:'1m',
            issuer:'nodebird',
        });
        return res.json({
            code:200,
            message:'token 발급되었음다',
            token
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            code:500,
            message:'server Error',
        });
    }
});

// 테스트용 ~ 성공 시 토큰 내용물을 응답으로 보낸다.
router.get('/test', verifyToken, (req, res)=>{
    res.json(req.decoded);
});

router.get('/posts/my', verifyToken, (req, res)=>{
    Post.findAll({ where:{userId:req.decoded.id}})
        .then((posts)=>{
            console.log(posts);
            res.json({
                code:200,
                payload:posts,
            });
        })
        .catch((err)=>{
            console.error(err);
            return res.status(500).json({
                code:500,
                message:'server error',
            });
        });
});

router.get('/posts/hashtag/:title', verifyToken, async(req, res)=>{
    try{
        const hashtag = await Hashtag.findOne({where:{title:req.params.title}});
        if(!hashtag){
            return res.status(404).json({
                code:404,
                message : "No result",
            });
        }
        const posts = await hashta.getPosts();
        return res.json({
            code:200,
            payload:posts,
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            code:500,
            message:"Server Error",
        });
    }
});

module.exports = router;

module.exports = router;