/**
 * Created by Sergei on 04.06.2017.
 */

const express = require('express');

module.exports = (service) => {
    const contact = express.Router();

    contact.get('/', (req, res) => {
        let options = req.query;
        service.getContacts(options).then((array) => {
            res.json({ message: array });
        }).catch((error) => {res.json({ error: error })});
    });

    contact.post('/', (req, res) => {
        let object = req.body;
        service.addContact(object).then((object) => {
            res.json({ message: object });
        }).catch((error) => {res.json({ error: error })});
    });

    contact.delete('/:id', (req, res) => {
        let options = req.params;
        service.deleteContact(options).then((object) => {
            res.json({ message: object });
        }).catch((error) => {res.json({ error: error })});
    });

    return contact;
};