'use strict';

/**
 *  comment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::comment.comment', (strapi) => ({
    findAllForUser: async (ctx) => {
        const results = await strapi.entityService.findMany('api::comment.comment', {
            start: ctx.request.body.startNumber,
            limit: 15,
            filters: { post: {slug: ctx.request.body.slug} },
            sort: { posted: 'DESC' },
            populate: { user: true },
        });

        ctx.response.body = {results};
        ctx.response.status = 200;
        return results;
    },

    create: async (ctx) => {
        await strapi.entityService.create('api::comment.comment', {
            ...ctx.request.body
        })

        ctx.response.status = 200;
        return;
    },
}));