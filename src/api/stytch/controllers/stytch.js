'use strict';

/**
 *  stytch controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::stytch.stytch', ({strapi}) => ({
    findFromStytchId: async (ctx) => {
        let result = await strapi.entityService.findMany('api::stytch.stytch', {
            feilds: ['id', 'stytchAuthMethod', 'authIdentifier'],
            filters: { stytchId: ctx.request.body.stytchId },
            populate: { user: true },
        });

        strapi.log.info(JSON.stringify(ctx.request.body));
        /** 
        if(result.length < 1) {
            result = await strapi.entityService.create('api::stytch.stytch', {
                fields: ['id', 'stytchAuthMethod', 'authIdentifier'],
                data: { stytchId: ctx.request.body.stytchId, stytchAuthMethod: ctx.request.body.stytchId, authIdentifier: ctx.request.body.authIdentifier },
            });
        }
*/
        ctx.response.body = JSON.stringify(result);
        ctx.send();
        return { result };
    },
  
}));