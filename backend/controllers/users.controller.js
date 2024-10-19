
const usersService = require('../services/users.service');
const rolesService = require('../services/roles.service');
const service = new usersService();
const roles = new rolesService();

const create = async (req, res) => {
    try {
        const response = await service.create(req.body);
        res.json({ success: true, data: response });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const get = async (req, res) => {
    try {
        const user_without_roles = await service.find();
        const roles_list = await roles.find();

        const response = user_without_roles.map(user => {
            const role = roles_list.find(role => role.id === user.role_id);
            return {
                ...user.dataValues,
                role_id: role ? role.name : "Role not found"
            };
        });
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


const getById = async (req, res) => {
    try {
        const { id } = req.params;
        const user_without_roles = await service.findOne(id);
        const roles_list = await roles.find();
        const role = roles_list.find(role => role.id === user_without_roles.role_id);
        const response = {
            ...user_without_roles.dataValues,
            role_id: role ? role.name : "Role not found"
        };
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const response = await service.update(id, body);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

const _delete = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await service.delete(id);
        res.json(response);
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = {
    create, get, getById, update, _delete
};
