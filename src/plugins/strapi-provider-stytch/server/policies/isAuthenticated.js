'use strict';

module.exports = async (ctx, next) => {
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

    await next();

  } catch (err) {
    return ctx.badRequest('Token invalid.');
  }
};
