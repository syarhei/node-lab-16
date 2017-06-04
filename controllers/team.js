/**
 * Created by Sergei on 04.06.2017.
 */

const express = require('express');

module.exports = (service) => {
    const team = express.Router();

    team.get('/', (req, res) => {
        let options = req.query;
        service.getTeams(options).then((array) => {
            res.json({ message: array });
        }).catch((error) => {res.json({ error: error })});
    });


    team.post('/', (req, res) => {
        let object = req.body;
        service.addTeam(object).then((object) => {
            res.json({ message: object });
        }).catch((error) => {res.json({ error: error })});
    });

    team.delete('/:id', (req, res) => {
        let options = req.params;
        service.deleteTeam(options).then((object) => {
            res.json({ message: object });
        }).catch((error) => {res.json({ error: error })});
    });

    return team;
};