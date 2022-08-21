'use strict';

/**
 *  post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', (strapi) => ({
    findAllForUser: async (ctx) => {
        const results = await strapi.entityService.findMany('api::post.post', {
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
        await strapi.entityService.create('api::post.post', {
            ...ctx.request.body
        })

        ctx.response.status = 200;
        return;
    },
}));