/*  passport 모듈은 req객체에 isAuthenticated 메서드를 추가함
 *  로그인 중이면 req.isAuthenticated() 가 true, 그렇지 않으면 false */

exports.isLoggedIn = (req, res, next)=>{
    if(req.isAuthenticated()){
        next();
    }else{
        res.status(403).send('로그인 필요합니다');
    }
};

exports.isNotLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        next();
    }else{
        const message = encodeURIComponent('로그인한 상태입니다요');
        res.redirect(`/?error=${message}`);
    }
};