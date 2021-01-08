const passport = require('passport');

// 다른 서비스를 통해 로긘 하지 않고, 자체적 회원가입 후 로그인
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports= ( )=>{
    // serialize, deserialize = 세션에 불필요한 데이터를 담아두지 않기 위함.

    /*  serializeUser
     *  로그인 시 실행. req.session 객체에 어떤 데이터를 저장할 지 정하는 메서드 
     *  done : 첫번째 인수 = 에러 발생 시 사용 / 두번째 인수 = 저장하고 싶은 데이터 넣기 */
    passport.serializeUser((user, done)=>{
        done(null, user.id);
    });

    /*  deserializeUser
     *  매 요청 시마다 실행. passport.session 미들웨어가 이 메서드 호출
     *  serializeUser의 done의 두번째 인수로 넣었던 데이터가 deserialize의 매개변수가 된다.(사용자의 아이디)
     *  이후 데이터베이스에서 사용자 정보 조회 -> req.user에 저장 */
    passport.deserializeUser((id, done)=>{
        User.fineOne({where:{id}})
        .then(user=> done(null, user))
        .catch(err=>done(err));
    });

    local();
    kakao();
};
