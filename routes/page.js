const express = require('express');
const router = express.Router();
const { renderProfile, renderJoin, renderMain } = require('../controllers/page');
const {isLoggedIn, isNotLoggedIn} = require('../middlewares');

router.use((req, res, next) => { 
    res.locals.user = req.user; //router에서 공통으로 사용하는 변수
    res.locals.followerCount = 0;
    res.locals.followingCount = 0;
    res.locals.followerIdList = [];
    next();
});

router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);

module.exports = router;