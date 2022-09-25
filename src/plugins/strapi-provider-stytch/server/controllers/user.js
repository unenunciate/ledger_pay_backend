'use strict';
/**
 * user.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

const { sanitize } = require('@strapi/utils');

/* eslint-disable no-useless-escape */
const _ = require('lodash');

module.exports = {


    async index(ctx) {

        const user = ctx.state.user;

        const userSchema = strapi.getModel('plugin::users-permissions.user');
        // Sanitize the template's user information
        const sanitizedUserInfo = await sanitize.sanitizers.defaultSanitizeOutput(userSchema, user);

        return ctx.send({
            user: sanitizedUserInfo,
        });
    },

    async getUserFromStytch(ctx) {
        const [user] = await strapi.entityService.findMany("plugin::strapi-provider-stytch.user", {where: {stytchUUID: ctx.body.stytchUUID}, populate: {user: true}});

        return ctx.send({
            user,
        });
    },

    async createUserFromStytch(ctx) {
        const user = await strapi.entityService.create("plugin::strapi-provider-stytch.user", {data: { ...ctx.body }, fields: ['username', 'id', 'EOA']});

        strapi.service("plugin::user-permissions.addon").plus(user);

        const final = await strapi.entityService.find("plugin::strapi-provider-stytch.user", user.id, { populate: {wallets: true} });

        return ctx.send({
            user: final
        });
    },

    async deleteEmail(ctx) {

        //TODO
    },

    async deletePhone(ctx) {

        //TODO
    },

    async deleteWallet(ctx) {


        //TODO
    },

};