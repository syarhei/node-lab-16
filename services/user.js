"use strict";

module.exports = (user) => {
    function User(user) {
        this.getUsers = getUsers;
        this.getCurrentState = getCurrentState;

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
                    console.log();
                    if (startWorkHour.getHours() < hour && hour < finishWorkHour.getHours()) {
                        resolve(true);
                    } else {
                        if (startWorkHour.getHours() == hour) {
                            if (startWorkHour.getMinutes() > date.getUTCMinutes())
                                resolve(true);
                            else resolve(false);
                        }
                        else if (finishWorkHour.getHours() == hour) {
                            if (startWorkHour.getMinutes() < date.getUTCMinutes())
                                resolve(true);
                            else resolve(false);
                        }
                        else resolve(false);
                    }
                }).catch(reject);
            })
        }
    }

    return new User(user);
};