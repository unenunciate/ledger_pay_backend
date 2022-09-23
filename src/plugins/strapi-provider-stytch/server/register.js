

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
  strapi.container.get("auth").register("content-api", { //we could use jwt instead of session token for quicker responses
    name: "custom-session-token-stytch-verifier",
    authenticate: async function (ctx, next) {

      const { stytchService } = strapi.plugins['strapi-provider-stytch'].services;
      const isEnabled = await stytchService.isEnabled();

      if (!isEnabled) {
        return ctx.badRequest('auth.disabled');
      }

      const { authorization } = ctx.request.header || null;

      if (!authorization) {
        return ctx.badRequest('No authorization header.');
      }

      const session_token = authorization.substring(7);

      if (!session_token) {
        return ctx.badRequest('No bearer token');
      }


      try {
        const { user } = await client.sessions.authenticate({ "session_token": session_token });

        if (!user) {
            return ctx.badRequest('No stytch user found for bearer token.');
        }

        const strapiUser = await stytchService.user({ stytchUUID: user.user_id });

        if (!strapiUser) {
          strapi.log.debug("strapiUser not found")
          return ctx.badRequest('No strapi user found for bearer token.');
        }

        ctx.state.user = strapiUser;
        ctx.cookies.set("session_token", session_token);

        next();

      } catch (err) {
        return ctx.badRequest('Token invalid.');
      }

    },
    verify: async function (auth, config) {
      const { credentials: user } = auth;

      if (!config.scope) {
        console.log("no config scope")
        if (!user) {
          // A non authenticated user cannot access routes that do not have a scope
          throw new UnauthorizedError();
        } else {
          // An authenticated user can access non scoped routes
          return;
        }
      }

      let { allowedActions } = auth;

      if (!allowedActions) {
        console.log("no allowed actions")
        const permissions = await strapi.query('plugin::users-permissions.permission').findMany({
          where: { role: user ? user.role.id : { type: 'public' } },
        });

        allowedActions = map('action', permissions);
        auth.allowedActions = allowedActions;
      }


      console.log("allowedActions")
      console.log(allowedActions);

      const isAllowed = castArray(config.scope).every((scope) =>
        allowedActions.includes(scope));

      return;// return for now, search how to add scopes...

      if (!isAllowed) {
        throw new ForbiddenError();
      }
    },
  });
};
