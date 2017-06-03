/**
 * Created by Sergei on 03.06.2017.
 */

let user = [
    { id: 1, name: 'user1', team: 1, UTC: 2, startWork: '17:39', finishWork: '23:41'},
    { id: 2, name: 'user2', team: 1, UTC: 2, startWork: '14:41', finishWork: '19:33'},
    { id: 3, name: 'user3', team: 1, UTC: 2, startWork: '14:40', finishWork: '19:00'},
    { id: 4, name: 'user4', team: 1, UTC: 2, startWork: '12:41', finishWork: '13:33'},
    { id: 5, name: 'user5', team: 1, UTC: 2, startWork: '10:40', finishWork: '11:00'},
];

let mock = require('../mock/repository') (user);
let service = require('../../services/user') (mock);

describe('users:', () => {
    it('getUsers()', async () => {
        let array = await service.getUsers({ limit: 10, offset: 1 });
        let without_params = await service.getUsers();
        let with_param = await service.getUsers({ limit: 10 });
        expect(mock.findAll).toHaveBeenCalled();
        expect(array).toEqual(without_params);
    });
    it('getCurrentState()', async () => {
        let isWork = await service.getCurrentState(3);
        expect(mock.findById).toHaveBeenCalled();
    });
    it('getCommonTime()', async () => {
        let time = await service.getCommonTime(1,2);
        expect(time).toBe('15:39 - 17:33');
        let error = await service.getCommonTime(4,5);
        expect(error).toBe('No common time');
    });
    it('addUser()', async () => {
        let object = await service.addUser(user[0]);
        expect(mock.create).toHaveBeenCalled();
        expect(object).toBe(user[0]);
    });
    it('deleteUser()', async () => {
        let object = await service.deleteUser({ id: 1 });
        expect(mock.destroy).toHaveBeenCalled();
        expect(object).toBe(1);
    });
});