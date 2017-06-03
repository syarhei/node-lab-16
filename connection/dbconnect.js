const config = require('../config.json');

module.exports = (Sequelize) => {
    const cf = process.env.NODE_ENV === 'production' ? config.pg : config.db;

    const options = {
        host: cf.host,
        dialect: cf.dialect,
        logging: false,
        define: {
            timestamps: true,
            paranoid: true,
            defaultScope: {
                where: {
                    deletedAt: { $eq: null }
                }
            }
        }
    };

    const sequelize = new Sequelize(cf.name, cf.user, cf.password, options);
    const team = require('../models/team') (Sequelize, sequelize);
    const user = require('../models/user')(Sequelize, sequelize,team);

    return {
        user: user,
        team: team,
        sequelize: sequelize
    };
};