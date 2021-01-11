const express = require('express');

const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

/* 다른 사용자를 팔로우하는 기능 */

router.post('/:id/follow', isLoggedIn, async (req, res, next)=>{
    try{
        // 팔로우 할 사용자 데이터베이스에서 조회
        const user = await User.findOne({where: { id:req.user.id}});
        if(user){
            // 시퀄라이즈에서 추가한 메서드로 로그인한 사용자와의 관계 지정
            await user.addFollowing(parseInt(req.params.id, 10));
            res.send('success');
        }else{
            res.status(404).send('no user');
        }
    } catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;