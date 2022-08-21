'use strict';

/**
 *  stytch controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::stytch.stytch', ({strapi}) => ({
    findFromStytchId: async (ctx) => {
        let result = await strapi.entityService.findMany('api::stytch.stytch', {
            feilds: ['id', 'stytchAuthMethod', 'authIdentifier'],
            filters: { stytchId: ctx.params.stytchId },
            populate: { user: true },
        });

        strapi.log.info(JSON.stringify(ctx.params));

        if(result.length < 1) {
            result = await strapi.entityService.create('api::stytch.stytch', {
                fields: ['id'],
                data: { stytchId: ctx.params.stytchId, stytchAuthMethod: ctx.params.stytchAuthMethod, authIdentifier: ctx.params.authIdentifier },
            });
        }

        ctx.response.body = JSON.stringify(result);

        return { result };
    },
  
}));