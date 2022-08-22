module.exports = (plugin) => {

    plugin.controllers.user.create = async (ctx) => {
        const id = await strapi.entityService.create('plugin::users-permissions.user', {
            fields: ['id'],
            data: {
                ...ctx.request.body
            }
        });
        
        const result =  await strapi.entityService.findOne('plugin::users-permissions.user', id.id);

        ctx.response.status = 200;
        return result;
    }

  
    return plugin;
  };