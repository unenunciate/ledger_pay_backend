'use strict';
/**
 * user.js controller
 *
 * @description: A set of functions called "actions" for managing `User`.
 */

const { sanitize } = require('@strapi/utils');

/* eslint-disable no-useless-escape */
const _ = require('lodash');
const { wyreService } = strapi.plugins['strapi-plugin-wyre'].services;
const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


module.exports = {


  async createPaymentOrder(ctx) {
    const { reservationData } = ctx.request.body;
    const reservation = await wyreService.updateWyreProfile(reservationData);


    if (!reservation) {
      ctx.badRequest('wyre.error');
    }

    const paymentOrder = await wyreService.createPaymentOrder(reservation);

    if (paymentOrder) {
      ctx.send({
        paymentOrder
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

    const data = ctx.request.body;

    //TODO: query to create... 
    const user = ctx.state.user;
    const wyreProfile = await strapi.db.query("").create({
      data: {
        ...data,
        stytchUUID: user.user_id
      },
    })

    ctx.send({
      wyreProfile
    })

  },





};