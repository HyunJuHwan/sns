const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const env = process.env.NODE_ENV !== 'development';
const config = require('../config/config')[env];
const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
)
db.sequelize = sequelize;

const basename = path.basename(__filename); // path의 마지막 파일명, 여기서는 index.js
fs.readdirSync(__dirname) // 현재 파일의 폴더명 = __dirname
  .filter(file =>{
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) =>{
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
    model.initialize(sequelize);
  });

  Object.keys(db).forEach(modelName => { //initialize먼저 전체 실행 후 associated를 실행해야 한다.
    if(db[modelName].associated){
      db[modelName].associated(db);
    }
  })

module.exports = db;