'use strict';

/**
 *  bet controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::bet.bet', (strapi) => ({
    findAllForUser: async (ctx) => {
        const results = await strapi.entityService.findMany('api::bet.bet', {
            start: ctx.request.body.startNumber,
            limit: 15,
            filters: { user: {slug: ctx.request.body.slug} },
            sort: { placed: 'DESC' },
            populate: { user: true },
        });

        ctx.response.body = {results};
        ctx.response.status = 200;
        return results;
    },

    create: async (ctx) => {
        await strapi.entityService.create('api::bet.bet', {
            ...ctx.request.body
        })

        ctx.response.status = 200;
        return;
    },
}));