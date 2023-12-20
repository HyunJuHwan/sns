const express = require('express');
const cookieParser = require('cookie-parser'); // cookie
const morgan = require('morgan'); // 요청응답 logging
const path = require('path'); //node 내장 모듈
const session = require('express-session'); //session
const nunjucks = require('nunjucks'); //front frameworks
const dotenv = require('dotenv'); //설정파일
const passport = require('passport');
const { sequelize } = require('./models');

dotenv.config(); //process.env에 값이 들어간다.
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');

const passportConfig = require('./passport');

const { watch } = require('fs');
const { error } = require('console');

const app = express();
passportConfig();

app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
    express: app,
    watch: true,
});

sequelize.sync( {force: false} ) //force = 서버 재시작 시 테이블 전체 삭제 후 다시 생성, sync 시 DB연결
    .then(() => {
        console.log('db connection ok');
    })
    .catch((err) => {
        console.error(err);
    })

app.use(morgan('dev')); // logging dev = dev -> combined = prod
app.use(express.static(path.join(__dirname, 'public'))); //public dir static으로 변경, __dirname = SNS 경로와 public 경로를 join하고 static으로 변경
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); // json요청 받게
app.use(express.urlencoded({extended:false})); //form 요청 받게
app.use(cookieParser(process.env.COOKIE_SECRET)); //{connect.sid : 랜덤쿠키값} 객체로 만들어줌
app.use(session( {
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET, //cookieparser와 일치하게
    cookie : {
        httpOnly : true, //javascript접근 막기
        secure : false, // ssl 적용시 true
    }
}))
app.use(passport.initialize()); // 꼭 express.session 미들웨어 밑에 작성해야한다. , req.user, req.login, req.isAuthenticated, req.logout 함수 사용 가능
app.use(passport.session()); // connect.sid라는 이름으로 세션 쿠키가 브라우저로 전송, 로그인 이후 요청이 들어오면 deserializeUser 메서드 호출

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);

app.use((req,res,next) =>{ //404 NOT FOUND
    const error = new Error(`${req.url} ${req.method} 화면을 찾을 수 없습니다.`);
    error.status = 404;
    next(error); //미들웨어에서 다음 미들웨어로 넘어가기 위해서는 next가 필수
});
app.use((err, req, res, next) =>{ //error처리 미들웨어
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; //에러 로그를 서비스한테 넘긴다. 현재 표시 x
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});