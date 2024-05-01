const express = require('express');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');
const router = express.Router();

//Post /auth/join
router.post('/join', isNotLoggedIn, join);
//Post /auth/login
router.post('/login', isNotLoggedIn, login);
//Get /auth/logout
router.get('/logout', isLoggedIn, logout);

//Get /auth/kakao
router.get('/kakao', passport.authenticate('kakao')); //카카오톡 로그인 화면으로 redirect -> 로그인 성공 후 callback으로 결과를 보내준다.

//Get /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/?loginError=카카오로그인 실패'
}), (req,res) => {
    res.redirect('/');
});

module.exports = router;