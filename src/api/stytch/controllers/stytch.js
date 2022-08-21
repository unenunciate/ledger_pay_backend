'use strict';

/**
 *  stytch controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::stytch.stytch', (strapi) => ({
    create: async (ctx) => {
        await strapi.entityService.create('api::comment.comment', {
            ...ctx.request.body
        })
        
        ctx.response.status = 200;
        return results;
    },
}));