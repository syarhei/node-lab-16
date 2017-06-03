/**
 * Created by Sergei on 03.06.2017.
 */

let user = [
    { id: 1, name: 'user1', team: 1, UTC: 3, startWork: '14:40', finishWork: '23:00'},
    { id: 2, name: 'user2', team: 1, UTC: 2, startWork: '14:40', finishWork: '19:00'},
    { id: 3, name: 'user3', team: 1, UTC: 2, startWork: '14:40', finishWork: '19:00'},
];

let mock = require('../mock/repository') (user);
let service = require('../../services/user') (mock);

describe('user', () => {
    it('getUsers()', async () => {
        let array = await service.getUsers({ limit: 10, offset: 1 });
        let without_params = await service.getUsers();
        let with_param = await service.getUsers({ limit: 10 });
        expect(mock.findAll).toHaveBeenCalled();
        expect(array).toEqual(without_params);
    });
    it('getCurrentState()', async () => {
        let isWork = await service.getCurrentState(1);
        console.log(isWork);
    })
});