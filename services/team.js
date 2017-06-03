/**
 * Created by Sergei on 02.06.2017.
 */

module.exports = (team) => {
    function Team(team) {
        this.getTeams = getTeams;
        this.addTeam = addTeam;
        this.deleteTeam = deleteTeam;

        function getTeams(options) {
            return new Promise((resolve, reject) => {
                team.findAll({ offset: options.offset, limit: options.limit}).then(resolve).catch(reject);
            })
        }

        function addTeam(object) {
            return new Promise((resolve, reject) => {
                team.create(object).then(resolve).catch(reject);
            })
        }

        function deleteTeam(options) {
            return new Promise((resolve, reject) => {
                team.destroy({ where: {
                    id: options.id
                }}).then(resolve).catch(reject);
            })
        }
    }

    return new Team(team);
};