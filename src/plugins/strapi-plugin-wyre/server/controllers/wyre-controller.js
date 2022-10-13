"use strict";
/**
 * user.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

const { sanitize } = require("@strapi/utils");

/* eslint-disable no-useless-escape */
const _ = require("lodash");
const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
  async createPaymentOrder(ctx) {
    const { wyreService } = strapi.plugins["strapi-plugin-wyre"].services;

    // const user = ctx.state.user;
    const paymentOrder = ctx.request.body;

    // test
    let user = { id: "2" };
    strapi.log.debug("User ID is: ", user.id);
    strapi.log.debug("paymentOrder is: ", paymentOrder);

    const wyreProfile = await strapi.db
      .query("plugin::strapi-plugin-wyre.wyre-profile")
      .findOne({
        where: { user: user.id },
        populate: true,
      });

    strapi.log.debug(wyreProfile);
    const response = await wyreService.createOrder(paymentOrder, wyreProfile);

    strapi.log.debug(response);
    if (!response) {
      ctx.badRequest("wyre.error");
    }
    strapi.log.debug("Wyre Order created succesfully");
    ctx.send({
      response,
    });
  },

  async createWithdrawalOrder(ctx) {
    const { wyreService } = strapi.plugins["strapi-plugin-wyre"].services;

    const user = ctx.state.user;
    const withdrawOrder = ctx.request.body;
    const wyreProfile = await strapi.db
      .query("plugin::strapi-plugin-wyre.wyre-profile")
      .findOne({
        where: { user: user.id },
        populate: true,
      });

    strapi.log.debug(wyreProfile);
    const response = await wyreService.createWithdraw(
      withdrawOrder,
      wyreProfile
    );

    strapi.log.debug(response);
    if (!response) {
      ctx.badRequest("no.bankAccount");
    }
    strapi.log.debug("Wyre Order created succesfully");
    ctx.send({
      response,
    });
  },

  async updateWyreProfile(ctx) {
    const data = ctx.request.body;
    //TODO: query to update
    const user = ctx.state.user;
    const wyreProfile = await strapi.db.query("").update({
      where: { user: user.stytchUUID },
      data: data,
    });

    ctx.send({
      wyreProfile,
    });
  },

  async addDebitCardToProfile(ctx) {
    strapi.log.debug("wyreController.addDebitCard");
    const debitCard = ctx.request.body;
    const user = ctx.state.user;

    const newDebitCard = await strapi.db
      .query("plugin::strapi-plugin-wyre.debit-card")
      .create({
        data: debitCard,
      });

    strapi.log.debug(newDebitCard);
    const wyreProfile = await strapi.db
      .query("plugin::strapi-plugin-wyre.wyre-profile")
      .update({
        where: { user: user.id },
        data: { debitCards: newDebitCard.id },
        populate: ["debitCards"],
      });

    strapi.log.debug(wyreProfile);

    return wyreProfile;
  },

  async updateDebitCard() {},

  async addBankToProfile(ctx) {
    strapi.log.debug("wyreController.addBankToProfile");
    const bank = ctx.request.body;
    const user = ctx.state.user;

    const newBank = await strapi.db.query("api::bank.bank").create({
      data: bank,
    });

    strapi.log.debug(newBank);
    const wyreProfile = await strapi.db
      .query("plugin::strapi-plugin-wyre.wyre-profile")
      .update({
        where: { user: user.id },
        data: { banks: newBank.id },
        populate: ["banks"],
      });

    strapi.log.debug(wyreProfile);

    return wyreProfile;
  },

  async updateBank() {},

  async deleteDebitCardFromProfile(ctx) {},

  async addAddressToProfile(ctx) {
    strapi.log.debug("wyreController.addAddress");
    const address = ctx.request.body;
    const user = ctx.state.user;

    const newAddress = await strapi.db
      .query("plugin::strapi-plugin-wyre.address")
      .create({
        data: address,
      });

    strapi.log.debug(newAddress);
    const wyreProfile = await strapi.db
      .query("plugin::strapi-plugin-wyre.wyre-profile")
      .update({
        where: { user: user.id },
        data: { addresses: newAddress.id },
        populate: ["addresses"],
      });

    strapi.log.debug(wyreProfile);
    return wyreProfile;
  },

  async updateAddress(ctx) {
    strapi.log.debug("wyreController.addAddress");
    const address = ctx.request.body;
    const user = ctx.state.user;

    const newAddress = await strapi.db
      .query("plugin::strapi-plugin-wyre.address")
      .create({
        data: address,
      });

    strapi.log.debug(newAddress);
    const wyreProfile = await strapi.db
      .query("plugin::strapi-plugin-wyre.wyre-profile")
      .update({
        where: { user: user.id },
        data: { addresses: newAddress.id },
        populate: ["addresses"],
      });

    strapi.log.debug(wyreProfile);
    return wyreProfile;
  },

  async deleteAddressFromProfile(ctx) {},
};
