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
    const wyreProfile = await strapi.db.query("plugin::strapi-plugin-wyre.wyre-profile").findOne({
      where: { user: user.id },
      populate: true,
    })

    console.log(wyreProfile);
    const response = await wyreService.createOrder(paymentOrder, wyreProfile);

    console.log(response);
    if (!response) {
      ctx.badRequest('wyre.error');

    }
    strapi.log.debug("Wyre Order created succesfully");
    ctx.send({
      response,
    })

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

  async addDebitCardToProfile(ctx) {

    strapi.log.debug("wyreController.addDebitCard");
    const debitCard = ctx.request.body;
    const user = ctx.state.user;

    const newDebitCard = await strapi.db.query('plugin::strapi-plugin-wyre.debit-card').create({
      data: debitCard,
    })

    console.log(newDebitCard);
    const wyreProfile = await strapi.db.query("plugin::strapi-plugin-wyre.wyre-profile").update({
      where: { user: user.id },
      data: { debitCards: newDebitCard.id },
      populate: ['debitCards'],
    });

    console.log(wyreProfile);

    return wyreProfile;

  },

  async deleteDebitCardFromProfile(ctx) {

  },

  async addAddressToProfile(ctx) {

    strapi.log.debug("wyreController.addAddress");
    const address = ctx.request.body;
    const user = ctx.state.user;


    const newAddress = await strapi.db.query('plugin::strapi-plugin-wyre.address').create({
      data: address,
    })

    console.log(newAddress);
    const wyreProfile = await strapi.db.query("plugin::strapi-plugin-wyre.wyre-profile").update({
      where: { user: user.id },
      data: { addresses: newAddress.id },
      populate: ['addresses'],
    });

    console.log(wyreProfile);
    return wyreProfile

  },
  async deleteAddressFromProfile(ctx) {

  },

  async createWyreProfile(ctx) {

    strapi.log.debug('wyreController.createWyreProfile');
    const { wyreService } = strapi.plugins['strapi-plugin-wyre'].services;
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

    const { id } = await wyreService.createWyreUser(wyreProfile);

    const updatedWyreProfile = await strapi.db.query("plugin::strapi-plugin-wyre.wyre-profile").update({
      where: { id: wyreProfile.id },
      data: {
        wyreUUID: id
      },
    })

    console.log(wyreProfile);

    const updatedUser = await strapi.db.query("plugin::users-permissions.user").update({
      where: { stytchUUID: user.stytchUUID },
      data: {
        wyreProfile: { id: wyreProfile.id },
        populate: ['wyre-profile'],
      }
    })

    ctx.send({
      updatedUser,
      updatedWyreProfile
    })

  },

  async addPaymentMethod(ctx) {
    const { wyreService } = strapi.plugins['strapi-plugin-wyre'].services;
    const user = ctx.state.user;

    const { last4Digits, srn, id } = wyreService.createWyrePaymentMethod();


    const bankAccount = await strapi.db.query('plugin::strapi-plugin-wyre.address').create({
      data: {
        srn,
        accountId: id,
        lastDigits: last4Digits,
      },
    })

    console.log(newAddress);

    const wyreProfile = await strapi.db.query("plugin::strapi-plugin-wyre.wyre-profile").update({
      where: { user: user.id },
      data: {
        "bankAccount": bankAccount.id,
      },
      pupulate: ['bankAccount'],
    })


    console.log(wyreProfile);
    return wyreProfile
  },

  async withdraw(ctx) {

  },

  async createSuperfluidStream(ctx) {

  },


};