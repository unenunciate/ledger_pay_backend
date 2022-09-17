'use strict';
/**
 * user.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

const { sanitize } = require('@strapi/utils');

/* eslint-disable no-useless-escape */
const _ = require('lodash');
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


module.exports = {


  async createPaymentOrder(ctx) {
    const { wyreService } = strapi.plugins['strapi-plugin-wyre'].services;

    const user = ctx.state.user;
    const paymentOrder = ctx.request.body;
    const wyreProfile = strapi.db.query("plugin::strapi-plugin-wyre.wyre-profile").findOne({
      where: { user: user.id },
      populate: true,
    })

    const { transfer } = await wyreService.createPaymentOrder(paymentOrder, wyreProfile);

    if (transfer) {
      ctx.send({
        transfer,
      })
    }
    ctx.badRequest('wyre.error');

  },

  async updateWyreProfile(ctx) {

    const data = ctx.request.body;
    //TODO: query to update
    const user = ctx.state.user;
    const wyreProfile = await strapi.db.query("").update({
      where: { "user": user.stytchUUID },
      data: data,
    })

    ctx.send({
      wyreProfile
    })


  },

  async createWyreProfile(ctx) {

    strapi.log.debug('wyreController.createWyreProfile');
    const data = ctx.request.body;
    const user = ctx.state.user;

    console.log(data)
    console.log(user);
    const wyreProfile = await strapi.db.query("plugin::strapi-plugin-wyre.wyre-profile").create({
      data: {
        ...data,
        user: { id: user.id }
      },
    })

    console.log(wyreProfile);

    const updatedUser = await strapi.db.query("plugin::users-permissions.user").update({
      where: { stytchUUID: user.stytchUUID },
      data: {
        wyreProfile: { id: wyreProfile.id },
        populate: ['*'],
      }
    })

    ctx.send({
      updatedUser,
      wyreProfile
    })

  },





};