"use strict";

module.exports = (user) => {
    function User(user) {
        this.getUsers = getUsers;
        this.getCurrentState = getCurrentState;
        this.getCommonTime = getCommonTime;
        this.addUser = addUser;
        this.deleteUser = deleteUser;

        function getUserByID(id) {
            return new Promise((resolve, reject) => {
                user.findById(id).then(resolve).catch(reject);
            })
        }

        function getUsers(options) {
            let params = {};
            if (options != undefined && options.offset !=undefined && options.limit != undefined)
                params = {offset: options.offset, limit: options.limit};
            return new Promise((resolve, reject) => {
                user.findAll(params).then(resolve).catch(reject);
            })
        }

        function getCurrentState(id) {
            return new Promise((resolve, reject) => {
                return getUserByID(id).then((user) => {
                    if (user == null) throw 'User is not found';
                    let date = new Date();
                    let startWorkHour = new Date('01/01/2011 ' + user.startWork);
                    let finishWorkHour = new Date('01/01/2011 ' + user.finishWork);
                    let hour = (date.getUTCHours() + user.UTC);
                    if (startWorkHour.getHours() < hour && hour < finishWorkHour.getHours()) {
                        resolve(true);
                    } else {
                        if (startWorkHour.getHours() == hour) {
                            if (startWorkHour.getMinutes() < date.getUTCMinutes())
                                resolve(true);
                            else resolve(false);
                        }
                        else if (finishWorkHour.getHours() == hour) {
                            if (finishWorkHour.getMinutes() > date.getUTCMinutes())
                                resolve(true);
                            else resolve(false);
                        }
                        else resolve(false);
                    }
                }).catch(reject);
            })
        }

        function getCommonTime(id1, id2) {
            let time;
            return new Promise((resolve, reject) => {
                let promise = Promise.all([ getUserByID(id1), getUserByID(id2) ]);
                promise.then((users) => {
                    let startWork1 = new Date(Date.parse('01/01/2011 ' + users[0].startWork).valueOf() - users[0].UTC * 60*60000);
                    let finishWork1 = new Date(Date.parse('01/01/2011 ' + users[0].finishWork).valueOf() - users[0].UTC * 60*60000);
                    let startWork2 = new Date(Date.parse('01/01/2011 ' + users[1].startWork).valueOf() - users[1].UTC * 60*60000);
                    let finishWork2 = new Date(Date.parse('01/01/2011 ' + users[1].finishWork).valueOf() - users[1].UTC * 60*60000);
                    if (startWork1 < startWork2 && finishWork1 < startWork2)
                        resolve('No common time');
                    if (startWork1 > startWork2 && startWork1 > finishWork2)
                        resolve('No common time');
                    if (startWork1 > startWork2)
                        time = startWork1.getHours() + ':' + startWork1.getMinutes();
                    else
                        time = startWork2.getHours() + ':' + startWork2.getMinutes();
                    if (finishWork1 > finishWork2)
                        time += ' - ' + finishWork2.getHours() + ':' + finishWork2.getMinutes();
                    else
                        time += ' - ' + finishWork1.getHours() + ':' + finishWork1.getMinutes();
                    resolve(time);
                }).catch(reject);
            })
        }

        function addUser(object) {
            return new Promise((resolve, reject) => {
                user.create(object).then(resolve).catch(reject);
            })
        }

        function deleteUser(options) {
            return new Promise((resolve, reject) => {
                user.destroy({ where: {
                    id: options.id
                }}).then(resolve).catch(reject);
            })
        }
    }

    return new User(user);
};