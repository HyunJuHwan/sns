const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.join = async (req, res, next) => {
    const { nick, email, password } = req.body;
    try {
        const exUser = await User.findOne({ where : { email } });
        if(exUser) {
            return res.redirect('/join?error=exist');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
}
// Post /auth/login
exports.login = (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => { 
        // localStategy에서 done이 이 함수에서 호출된다 
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?error=${info.message}`);
        }
        return req.login(user, (loginError) => { //req.login 실행 시 passport/index.js의 serializeUser 실행
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/');
        })
    })(req,res,next);
}

exports.logout = (req,res) => { //세션쿠키 삭제, 브라우저에 남아있어도 로그인이 안된다.
    req.logout(() => {
        res.redirect('/');
    })
}