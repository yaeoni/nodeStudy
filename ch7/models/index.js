// 시퀄라이즈 패키지이자 생성자
const Sequelize = require('sequelize');

const User = require('./user');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';

// 데이터베이스 설정을 불러온 후 new를 통해 MySQL 연결 객체 생성
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

// db 객체에 User와 Comment 모델 담기
db.User = User;
db.Comment = Comment;

// 각각 모델의 init과 associate 함수 호출
User.init(sequelize);
Comment.init(sequelize);
User.associate(db);
Comment.associate(db);

module.exports = db;