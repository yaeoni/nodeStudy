/* 도메인 = 인터넷 주소 / 도메인 등록 기능을 위한 도메인 모델 정의 */
const Sequelize = require('sequelize');

module.exports = class Domain extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            // 인터넷 주소
            host : {
                type: Sequelize.STRING(20),
                allowNull: false,
            },
            // 도메인 종류
            type:{
                type: Sequelize.ENUM('free', 'premium'),
                allowNull: false,
            },
            // 클라이언트 비밀 키 -> 다른 개발자들이 우리의 API를 사용할 때 필요한 키
            clientSecret:{
                // UUID = 충돌 가능성이 낮은 랜덤한 문자열
                type: Sequelize.UUID,
                allowNull : false,
            },
        }, {
            sequelize,
            timestamps:true,
            paranoid:true,
            modelName : 'Domain',
            tableName: 'domains',
        });
    }
    static associate(db){
        db.Domain.belongsTo(db.User);
    }
}