/**
 * Created by Sergei on 04.06.2017.
 */

let contact = [
    { id: 1, user1: 1, user2: 2 },
    { id: 2, user1: 2, user2: 3 },
    { id: 3, user1: 1, user2: 3 }
];


let mock = require('../mock/repository') (contact);
let service = require('../../services/contact') (mock);

describe('contacts:', () => {
    it('getContacts()', async () => {
        let array = await service.getContacts({ limit: 10, offset: 1 });
        expect(mock.findAll).toHaveBeenCalled();
        expect(array).toEqual(contact);
    });
    it('addContact()', async () => {
        let object = await service.addContact(contact[0]);
        expect(mock.create).toHaveBeenCalled();
        expect(object).toBe(contact[0]);
    });
    it('deleteContact()', async () => {
        let object = await service.deleteContact(1);
        expect(mock.destroy).toHaveBeenCalled();
        expect(object).toBe(1);
    });
});