const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
passportConfig();


app.set('port', process.env.PORT || 8080);
app.set('view engine', 'html');

nunjucks.configure('views', {
    express:app,
    watch: true,
});
sequelize.sync({force:false})
    .then(()=>{
        console.log('DB connected');
    })
    .catch((err)=>{
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
//해당 경로 내에서 static 설정
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    }
}));

// req 객체에 passport 설정을 심는다.
app.use(passport.initialize());
// req.session 객체에 passport 정보를 저장한다. (express-session에서 생성하므로 그 뒤에 연결해야함.)
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없슈`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production'? err:{};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '에서 기다리고 있사와용');
});