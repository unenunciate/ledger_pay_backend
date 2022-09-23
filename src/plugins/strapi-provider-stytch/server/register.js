

'use strict';

const { castArray, map } = require('lodash/fp');
const { ForbiddenError, UnauthorizedError } = require('@strapi/utils').errors;


const getAdvancedSettings = () => {
  return strapi.store({ type: 'plugin', name: 'users-permissions' }).get({ key: 'advanced' });
};

const stytch = require("stytch");
const { getService } = require("@strapi/plugin-users-permissions/server/utils");

const client = new stytch.Client({
  project_id: strapi.config.get('stytch.project_id'),
  secret: strapi.config.get('stytch.secret_key'),
  env: stytch.envs.test,
});


module.exports = ({ strapi }) => {
  
};
