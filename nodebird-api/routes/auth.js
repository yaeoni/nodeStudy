const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

/*  회원가입 라우터  */
router.post('/join', isNotLoggedIn, async (req, res, next)=>{
    const { email, nick, password } = req.body;
    try{
        const exUser = await User.findOne({where:{email}});

        // 같은 이메일로 가입한 사용자 있으면, 회원가입 페이지로 되돌려보낸다.
        if(exUser){
            return res.redirect('/join?error=exist');
        }

        // 비밀번호 암호화
        const hash = await bcrypt.hash(password, 12);

        await User.create({
            email,
            nick,
            password:hash,
        });
        return res.redirect('/');
    } catch(err){
        console.error(err);
        return next(error);
    }
});

/* 로그인 라우터 */
router.post('/login', isNotLoggedIn, (req, res, next)=>{

    // local 미들웨어가 로컬 로그인 전략 수행 ( 미들웨어에 사용자 정의 기능 추가 )
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user, (loginError)=>{
            if(loginError){
                console.log(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        });
    })(req,res, next);
});


/* 로그아웃 라우터 */
router.get('/logout', isLoggedIn, (req, res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

/*  카카오 로그인 라우터 
 *  passport.authenticate 메서드에 콜백함수를 제공하지 않는데, 
 *  카카오 로그인은 성공 시 내부적으로 req.login 호출해서 우리가 해줄 필요 없음. 
 * 
 *  대신 로그인 실패했을 때 어디로 이동할 지 적어주기만 하면 된다.( failureRedirect ) */

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect:'/',
}), (req, res)=>{
    res.redirect('/');
})
module.exports = router;