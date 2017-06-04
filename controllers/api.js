/**
 * Created by Sergei on 04.06.2017.
 */

const express = require('express');

module.exports = (team, user, contact) => {
    const router = express.Router();

    let teamController = require('./team') (team);
    let userController = require('./user') (user);
    let contactController = require('./contact') (contact);

    router.use('/teams', teamController);
    router.use('/users', userController);
    router.use('/contacts', contactController);

    return router;
};