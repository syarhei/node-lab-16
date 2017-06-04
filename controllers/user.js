/**
 * Created by Sergei on 04.06.2017.
 */

const express = require('express');

module.exports = (service) => {
    const user = express.Router();

    user.get('/', (req, res) => {
        let options = req.query;
        service.getUsers(options).then((array) => {
            res.json({ message: array });
        }).catch((error) => {res.json({ error: error })});
    });

    user.post('/', (req, res) => {
        let object = req.body;
        service.addUser(object).then((object) => {
            res.json({ message: object });
        }).catch((error) => {res.json({ error: error })});
    });

    // проверка текущего состояния пользователя (рабочее/нерабочее время)
    user.get('/:id/status', (req, res) => {
        let id = req.params.id;
        service.getCurrentState(id).then((isWork) => {
            res.json({ message: { isWork: isWork } });
        }).catch((error) => {res.json({ error: error })});
    });

    // вычисление совместных рабочих часов 2ух пользователей
    user.get('/:id1/common-time/:id2', (req, res) => {
        let id1 = req.params.id1;
        let id2 = req.params.id2;
        service.getCommonTime(id1, id2).then((times) => {
            res.json({ message: times });
        }).catch((error) => {res.json({ error: error })});
    });

    user.delete('/:id', (req, res) => {
        let options = req.params;
        service.deleteUser(options).then((object) => {
            res.json({ message: object });
        }).catch((error) => {res.json({ error: error })});
    });

    return user;
};