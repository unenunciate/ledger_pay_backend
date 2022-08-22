module.exports = (plugin) => {

    plugin.controllers.user.create = async (ctx) => {
        const id = await strapi.entityService.create('plugin::users-permissions.user', {
            fields: ['id'],
            data: {
                ...ctx.request.body
            }
        });

        await strapi.entityService.update('plugin::users-permissions.user', id.id, {
            data: {
                stytches: ctx.request.body.stytches
            }
        });

        await strapi.entityService.update('api::stytch.stytch', ctx.request.body.stytches[0], {
            data: {
                user: id.id
            }
        });
        
        const result =  await strapi.entityService.findOne('plugin::users-permissions.user', id.id);

        ctx.response.status = 200;
        return result;
    }

  
    return plugin;
  };