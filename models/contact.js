/**
 * Created by Sergei on 04.06.2017.
 */

module.exports = (Sequelize,sequelize,user)=>{
    return sequelize.define('contacts',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        user1: {
            type: Sequelize.INTEGER,
            references: {
                model: user,
                key: 'id'
            },
        },
        user2: {
            type: Sequelize.INTEGER,
            references: {
                model: user,
                key: 'id'
            },
        }
    });
};