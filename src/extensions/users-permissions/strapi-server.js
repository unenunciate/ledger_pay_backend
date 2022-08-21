module.exports = (plugin) => {

    plugin.controllers.user.create = async (ctx) => {
        const result = await strapi.entityService.create('plugin::users-permissions.user', {
            fields: [
                "id",
                "username",
                "slug"
            ],
            data: {
                stytches: [ ctx.request.body.stytchStrapiId ],
                ...ctx.request.body
            }
        })
        
        ctx.response.status = 200;
        return result;
    },

    plugin.controllers.user.findFromStytchId = async (ctx) => {
        let result = await strapi.entityService.findMany('api::stytch.stytch', {
            feilds: ['id', 'stytchAuthMethod', 'authIdentifier'],
            filters: { stytchId: ctx.request.body.stytchId },
            populate: { user: true },
        });
        console.log(JSON.stringify(ctx.request.body))
        if(result.length < 1) {
            result = await strapi.entityService.create('api::stytch.stytch', {
                fields: ['id', 'stytchAuthMethod', 'authIdentifier'],
                data: { stytchId: ctx.request.body.stytchId, stytchAuthMethod: ctx.request.body.stytchId, authIdentifier: ctx.request.body.authIdentifier },
            });
        }

        ctx.response.body = JSON.stringify(result);
        return { result };
    },
  
    plugin.routes['content-api'].routes.push({
      method: 'GET',
      path: '/findFromStytchId',
      handler: 'plugin::users-permissions.user.findFromStytchId',
    });
  
    return plugin;
  };