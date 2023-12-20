const { Post, User, Hashtag } = require('../models');

exports.renderProfile = (req, res, next) => {
    res.render('profile', { title : '내 정보 - SNS'}); //render 인수에 담기는 데이터는 화면으로 다 넘어간다. 넘기고 싶은 정보가 있으면 같이 넣기
};

exports.renderJoin = (req, res, next) => {
    res.render('join', { title : '회원 가입 - SNS' });
};

exports.renderMain = async (req, res, next) => {
    try {
        const posts = await Post.findAll({
            include: {
                model: User,
                attributes: ['id', 'nick'],
            },
            order: [['createdAt', 'DESC']],
        })
        res.render('main', { 
            title : 'SNS',
            twits : posts,
        });        
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.renderHashtag = async (req, res, next) => {
    const query = req.query.hashtag;
    if (!query) {
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts = [];
        if(hashtag) {
            posts = await hashtag.getPosts({
                include: [{ model: User, attributes: ['id', 'nick']}],
                order: [['createdAt', 'DESC']],
            });
        }
        res.render('main', {
            title: `${query} | SNS`,
            twits: posts
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//라우터 -> 컨트롤러 -> 서비스 호출순서