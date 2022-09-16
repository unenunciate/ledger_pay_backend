'use strict';
/**
 * Auth.js controller
 *
 * @description: A set of functions called "actions" for managing `Auth`.
 */

const { sanitize } = require('@strapi/utils');

/* eslint-disable no-useless-escape */
const _ = require('lodash');
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {


    async sendMagicLink(ctx) {

        const { stytchService } = strapi.plugins['strapi-provider-stytch'].services;
        const isEnabled = await stytchService.isEnabled();

        if (!isEnabled) {
            return ctx.badRequest('plugin.disabled');
        }

        const params = _.assign(ctx.request.body);
        const email = params.email ? params.email.trim().toLowerCase() : null;
        const isEmail = emailRegExp.test(email);

        if (email && !isEmail) {
            return ctx.badRequest('wrong.email');
        }

        try {
            const { userCreated, userId } = await stytchService.sendMagicLink(email);
            console.log(userId);

            return ctx.send({
                email,
                userCreated,
                sent: true,
            })

        } catch (err) {
            strapi.log.debug(err);
            return ctx.badRequest('error.in.connection');
        }

    },


    async sendSMS(ctx) {

        const { stytchService } = strapi.plugins['strapi-provider-stytch'].services;

        const params = _.assign(ctx.request.body);
        const phoneNumber = params.phoneNumber ? params.phoneNumber.trim().toLowerCase() : null;

        if (!phoneNumber) {
            return ctx.badRequest('no.phone.provided');
        }


        try {
            const { userId, phoneId } = await stytchService.sendSMS(phoneNumber);
            console.log(userId);

            return ctx.send({
                phoneId,
                phoneNumber,
                sent: true,
            })

        } catch (err) {
            strapi.log.debug(err);
            return ctx.badRequest('error.in.connection');
        }

    },


    async walletLogin(ctx) {

        const { stytchService } = strapi.plugins['strapi-provider-stytch'].services;
        const isEnabled = await stytchService.isEnabled();

        if (!isEnabled) {
            return ctx.badRequest('plugin.disabled');
        }

        const { walletAddress, signature } = ctx.request.body;

        try {
            const sessionToken = await stytchService.walletLogin(walletAddress, signature);

            return ctx.send({
                sessionToken
            })

        } catch (err) {
            console.log(err);
            return ctx.badRequest('server.error');
        }
    },

    async emailLogin(ctx) {

        const { stytchService } = strapi.plugins['strapi-provider-stytch'].services;
        const isEnabled = await stytchService.isEnabled();

        if (!isEnabled) {
            return ctx.badRequest('plugin.disabled');
        }

        const { token } = ctx.request.query;

        try {
            const sessionToken = await stytchService.emailLogin(token);

            return ctx.send({
                sessionToken
            })

        } catch (err) {
            console.log(err);
            return ctx.badRequest('server.error');
        }
    },

    async smsLogin(ctx) {

        const { stytchService } = strapi.plugins['strapi-provider-stytch'].services;
        const isEnabled = await stytchService.isEnabled();

        if (!isEnabled) {
            return ctx.badRequest('plugin.disabled');
        }

        const { phoneId, code } = ctx.request.body;

        try {
            const sessionToken = await stytchService.smsLogin(phoneId, code);

            return ctx.send({
                sessionToken
            })

        } catch (err) {
            console.log(err);
            return ctx.badRequest('server.error');
        }
    },

    async oAuthLogin(ctx) {

        const { stytchService } = strapi.plugins['strapi-provider-stytch'].services;
        const isEnabled = await stytchService.isEnabled();

        if (!isEnabled) {
            return ctx.badRequest('plugin.disabled');
        }

        const { token } = ctx.request.query;

        try {
            const sessionToken = await stytchService.oAuthLogin(token);

            return ctx.send({
                sessionToken
            })

        } catch (err) {
            console.log(err);
            return ctx.badRequest('server.error');
        }
    },








};