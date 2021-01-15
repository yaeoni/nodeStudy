const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next)=>{
    try{
        // 사용자가 헤더에 토큰을 넣어보낼거임, verify로 토큰 검증 
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        return next();
    }catch(err){
        // 유효기간 초과 에러
        if(err.name == 'TokenExpiredError'){
            return res.status(419).json({
                code:419,
                message : "Token out of date"
            });
        }
        return res.status(401).json({
            code:401,
            message: "Not valid",
        });
    }
};

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