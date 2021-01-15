/* 로컬 로그인 전략 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    // 객체의 전략에 관한 설정
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done)=>{
        // 실제 전략 수행, 앞서 넣은 email, password가 매개변수가 된다.
        try{
            // 이메일 및 비밀번호 비교
            const exUser = await User.findOne({where:{email}});
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);
                if(result){
                    done(null, exUser);
                }else{
                    done(null, false, {message:'비밀번호가 일치하지 않슴다'});
                }
            }else{
                done(null, false, { message : '가입되지 않은 회원입니다요'});
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};