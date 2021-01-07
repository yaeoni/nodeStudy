const Sequelize = require('sequelize');

/*  모델은 Sequelize.Model을 확장한 클래스로 선언.
 *  크게 static init / static associate 메서드로 나뉨
 *  
 * init method : 테이블에 대한 선언
 * static method : 다른 모델과의 관계 */

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name: {
                type:Sequelize.STRING(20),
                allowNull:false,
                unique:true,
            },
            age:{
                type:Sequelize.INTEGER.UNSIGNED,
                allowNull:false,
            },
            married:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
            },
            comment:{
                type:Sequelize.TEXT,
                allowNull:false,
            },
            created_at:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            modelName:"User",
            tableName:"User",
            paranoid:false,
            charset:'utf8',
            collate:'utf8_general_ci',
        });
    }
    static associate(db){
        db.User.hasMany(db.Comment, {foreignKey:'commenter', sourceKey:'id'});
    }
};