const Sequelize = require('sequelize');
class User extends Sequelize.Model {
    static initiate(sequelize){
        User.init({
            email : {
                type: Sequelize.STRING(40),
                allowNull: true, // null 허용
                unique: true //고유값
            },
            nick : {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            provider: {
                type: Sequelize.ENUM('local', 'kakao'),
                allowNull: true,
                defaultValue: 'local'
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            }
        }, {
            sequelize,
            timestamps: true, //createdAt, updatedAt
            underscored: false, //created_at, updated_at
            modelName: 'User', //javascript ModelName
            tableName: 'users',//DB ModelName
            paranoid: true, //deleteAt 유저 삭제일, soft delete
            charset: 'utf8mb4', 
            collate: 'utf8mb4_general_ci', // 저장데이터 정렬방식
        })
    }

    static associate(db){
        db.User.hasMany(db.Post); //1:n
        db.User.belongsToMany(db.User, { //팔로워, n:n 
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow' //중간 테이블
        })
        db.User.belongsToMany(db.User, { //팔로잉 n:n
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow'
        })
    }
};

module.exports = User;