/**
 * Created by Sergei on 30.05.2017.
 */

module.exports = (Sequelize,sequelize)=>{
    return sequelize.define('teams',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: Sequelize.STRING(20)
    });
};