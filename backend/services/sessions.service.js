const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class sessionService {
    constructor() { }
    async findUser(user, pass) {
        const res = await models.users.findOne({
            where: {
                [Op.or]: {
                    email: user,
                    dni_id: user
                },
                password: pass
            }
        });
        return res;
    }

    async activateSession(userLogged, token) {
        const res = await models.users.update({
            remember_token: token,
        }, {
            where: {
                dni_id: userLogged.dni_id
            }
        });
        return res;
    }

    async activatedSessions(userLogged) {
        const res = await models.users.count({
            where: {
                dni_id: userLogged.dni_id,
                remember_token: { [Op.not]: null }
            }
        });
        return res;
    }

    async updateSession(id) {
        const res = await models.users.update({
            remember_token: null
        }, {
            where: {
                dni_id: id
            }
        });
        return res;
    }



}

module.exports = sessionService;