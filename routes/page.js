const express = require('express');
const router = express.Router();
const { renderProfile, renderJoin, renderMain } = require('../controllers/page');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');

router.use((req, res, next) => { 
    res.locals.user = req.user; //router(미들웨어)에서 공통으로 사용하는 변수 , req.session은 사용자 별 공유 데이터(같은 사용자는 로그아웃 전까지 여기에 데이터가 저장된다.)
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followingIdList = [];
    next();
});

router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);

module.exports = router;