module.exports = (Sequelize,sequelize,team)=>{
    return sequelize.define('users',{
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: Sequelize.STRING(20),
        team: {
            type: Sequelize.INTEGER,
            references: {
                model: team,
                key: 'id'
            },
        },
        UTC: {
            type: Sequelize.INTEGER,
            validate: {
                min: -12,
                max: 12
            }
        },
        startWork: Sequelize.TIME,
        finishWork: Sequelize.TIME
    });
};