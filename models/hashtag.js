const Sequelize = require('sequelize');

class Hashtag extends Sequelize.Model {
    static initiate(sequelize){
        Hashtag.init({
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            }
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            paranoid: false,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        })
    }

    static associate(db){
        db.Hashtag.belongsToMany(db.Post, { through : 'PostHashtag' })
        // 중간테이블에 직접 접근하려면 db.sequelize.models.PostHashtag 로 접근 가능
    }
};

module.exports = Hashtag;