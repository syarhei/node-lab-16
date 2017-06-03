/**
 * Created by Sergei on 02.06.2017.
 */

let team = [
    { id: 1, name: 'team1'},
    { id: 2, name: 'team2'},
    { id: 3, name: 'team3'},
];


let mock = require('../mock/repository') (team);
let service = require('../../services/team') (mock);

describe('teams', () => {
    it('getTeams()', async () => {
        let array = await service.getTeams({ limit: 10, offset: 1 });
        expect(mock.findAll).toHaveBeenCalled();
        expect(array).toEqual(team);
    });
});