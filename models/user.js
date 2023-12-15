const Sequelize = require('sequelize');
const { SELECT } = require('sequelize/types/query-types');

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
            paranoid: true, //deleteAt 유저 삭제일
            collate: 'utf8_general_ci',
        })
    }

    static associate(db){

    }
};

module.exports = User;