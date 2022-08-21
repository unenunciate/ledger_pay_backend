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
    }

  
    return plugin;
  };