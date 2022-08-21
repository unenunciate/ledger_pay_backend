'use strict';

/**
 *  challenge controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::challenge.challenge', (strapi) => ({
    findAllForUser: async (ctx) => {
        const results = await strapi.entityService.findMany('api::challenge.challenge', {
            start: ctx.request.body.startNumber,
            limit: 15,
            filters: { user: {slug: ctx.request.body.slug} },
            sort: { posted: 'DESC' },
            populate: { user: true },
        });

        ctx.response.body = {results};
        ctx.response.status = 200;
        return results;
    },

    create: async (ctx) => {
        await strapi.entityService.create('api::challenge.challenge', {
            ...ctx.request.body
        })

        ctx.response.status = 200;
        return;
    },
}));