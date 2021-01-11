const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, Hashtag } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try{
    fs.readdirSync('uploads');
}catch(err){
    console.error(err, "폴더 생성할게용");
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb){
            cb(null, 'uploads');
        },
        filename(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize : 5*1024 * 1024},
});

// /post/img : 이미지 하나를 업로드받은 뒤 이미지의 저장 경로를 클라이언트로 응답
router.post('/img', isLoggedIn, upload.single('img'), (req,res)=>{
    console.log(req.file);
    res.json({url: `/img/${req.file.filename}`});
});

const upload2 = multer();

// /post : 게시글 업로드 처리
/*  게시글을 데이터베이스에 저장 / 해시태그를 정규표현식으로 추출해냄
 *  해시태그 또한 데이터베이스에 저장 -> 결과로 [모델, 생성여부 반환] => 모델만 추출
 *  해시태그 모델들 post.addhashtags로 게시글과 연결 */
router.post('/', isLoggedIn, upload2.none(), async (req, res, next)=>{
    try{
        const post = await Post.create({
            content: req.body.content,
            img:req.body.url,
            UserId: req.user.id,
        });
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        if(hashtags){
            const result = await Promise.all(
                hashtags.map(tag=>{
                    return Hashtag.findOrCreate({
                        where : { title: tag.slice(1).toLowerCase()},
                    })
                }),
            );
            await post.addHashtags(result.map(r=>r[0]));
        }
        res.redirect('/');
    } catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;