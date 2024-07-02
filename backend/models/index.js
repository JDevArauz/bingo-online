const { bingo_numbers, bingo_numbersSchema } = require('./bingo_numbers.model');
const { bingos, bingosSchema } = require('./bingos.model');
const { bingos_per_event, bingos_per_eventSchema } = require('./bingos_per_event.model');
const { events, eventsSchema } = require('./events.model');
const { events_per_user, events_per_userSchema } = require('./events_per_user.model');
const { password_reset_tokens, password_reset_tokensSchema } = require('./password_reset_tokens.model');
const { personal_access_tokens, personal_access_tokensSchema } = require('./personal_access_tokens.model');
const { roles, rolesSchema } = require('./roles.model');
const { states, statesSchema } = require('./states.model');
const { users, usersSchema } = require('./users.model');
const { winners_per_event, winners_per_eventSchema } = require('./winners_per_event.model');

function setupModels(sequelize) {
    bingo_numbers.init(bingo_numbersSchema, bingo_numbers.config(sequelize));
    bingos.init(bingosSchema, bingos.config(sequelize));
    bingos_per_event.init(bingos_per_eventSchema, bingos_per_event.config(sequelize));
    events.init(eventsSchema, events.config(sequelize));
    events_per_user.init(events_per_userSchema, events_per_user.config(sequelize));
    password_reset_tokens.init(password_reset_tokensSchema, password_reset_tokens.config(sequelize));
    personal_access_tokens.init(personal_access_tokensSchema, personal_access_tokens.config(sequelize));
    roles.init(rolesSchema, roles.config(sequelize));
    states.init(statesSchema, states.config(sequelize));
    users.init(usersSchema, users.config(sequelize));
    winners_per_event.init(winners_per_eventSchema, winners_per_event.config(sequelize));

	//DEFINE YOUR ASSOCIATIONS HERE
}

module.exports = setupModels;
