/**
 * Created by Sergei on 02.06.2017.
 */

let team = [
    { id: 0, name: 'team1'},
    { id: 1, name: 'team2'},
    { id: 2, name: 'team3'},
];


let mock = require('../mock/repository') (team);
let service = require('../../services/team') (mock);

describe('teams', () => {
    it('get', async () => {
        let t = await service.getTeams({ limit: 10, offset: 1 });
    })
});