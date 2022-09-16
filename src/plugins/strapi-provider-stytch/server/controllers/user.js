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
        const { stytchService } = strapi.plugins['strapi-provider-stytch'].services;

        await stytchService.verification(ctx);

        const user = ctx.state.user;

        const stytchUser = stytchService.getUserFromStytch(user.stytchUUID);

        return ctx.send({
            stytchUser,
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