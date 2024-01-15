exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) { //passport 를 사용해서 로그인 했는지 검증
        next();
    } else {
        req.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) { //passport 를 사용해서 로그인 했는지 검증
        next();
    } else {
        const message = encodingURIComponent('이미 로그인 한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
};