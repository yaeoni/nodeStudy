const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const User = require('../models/user');

module.exports = ()=>{
    passport.use(new KakaoStrategy({
        // 카카오에서 발급해주는 아이디 -> 나중에 env 파일에 넣기
        clientID:process.env.KAKAO_ID,
        //카카오로부터 인증결과를 받을 라우터 주소
        callbackURL : '/auth/kakao/callback'
    }, async(accessToken, refreshToken, profile, done)=>{
        // 카카오에서는 인증 후에 profile속에 사용자 정보를 보내줌. 이걸 이용해서 회원가입 하면 된다.
        console.log('kakao profile', profile);
        try{
            const exUser = await User.findOne({
                where: { snsId:profile.id, provider:'kakao'},
            });
            if(exUser){
                done(null, exUser);
            }else{
                const newUser = await User.create({
                    email:profile._json &&profile._json.kaccount_email,
                    nick:profile.displayName,
                    snsId:profile.id,
                    provider:'kakao'
                });
                done(null, newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};