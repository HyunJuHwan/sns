const passport = require('passport');
const local = require('./localStrategy.js');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
    passport.serializeUser((user,done) => { //user === exUser
        done(null, user.id); //user id만 추출 -> 세션 == {세션쿠키 : 유저} 형식의 객체. 메모리에 저장하기때문에 전체를 저장하면 자원낭비.
    });

    passport.deserializeUser((id, done) => { 
        User.findOne({
            where: { id },
            include: [
                {
                    model: User,
                    attributes: ['id', 'nick'],
                    as: 'Followers',
                }, //팔로잉
                {
                    model: User,
                    attributes: ['id', 'nick'],
                    as: 'Followings',
                } //팔로워
            ]
        })
            .then((user) => done(null, user)) // req.user, req.session
            .catch(err => done(err));
    });

    local();
    kakao();
};