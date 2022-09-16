'use strict';

/**
 * `isLoggedIn` middleware
 */

module.exports = (config, { strapi }) => {

  return async (ctx, next) => {
    const { user: userService } = strapi.plugins['users-permissions'].services;
    const { stytchService } = strapi.plugins['strapi-provider-stytch'].services;
    const isEnabled = await stytchService.isEnabled();

    if (!isEnabled) {
      return ctx.badRequest('auth.disabled');
    }

    const user = ctx.state.user;

    if (!user) {
      return ctx.badRequest('stytch.error');
    }

    if (user.blocked) {
      return ctx.badRequest('blocked.user');
    }

    if (!user.confirmed) {
      await userService.edit(user.id, { confirmed: true });
    }
    await next();
  };
};
