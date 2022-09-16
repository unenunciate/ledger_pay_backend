'use strict';

/**
 * wyre-service.js
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const request = require('request');

const _ = require("lodash");
const crypto = require("crypto");
const { sanitize } = require('@strapi/utils');
const { copyFile } = require("fs");

const getOtions = {
  method: 'GET',
  url: 'https://api.testwyre.com/v3/debitcard/authorization/',
  headers: { accept: 'application/json' }
};

const postOptions = {
  method: 'POST',
  url: 'https://api.testwyre.com/v3/orders/reserve',
  headers: { accept: 'application/json', 'content-type': 'application/json' },
  body: {},
  json: true
};

module.exports = (
  {
    strapi
  }
) => {
  return {


    async initialize() {

    },

    async createOrder(data) {
      const reservation = await this.createWalletOrderReservation(data);


      //Extract data, save reusable info in wyre-profile

    },

    async createWalletOrderReservation(data) {

      const { amount, paymentMethod, sourceCurrency, destCurrency, dest, referrerAccountId } = data;


      const req = {
        amount,
        paymentMethod,
        sourceCurrency,
        destCurrency,
        dest,
        referrerAccountId,
        "amountIncludeFees": true,
      }


      request({ ...postOptions, req }, function (error, response, body) {
        if (error) throw new Error(error);

        const { reservation } = body;
        return { ...data, reservation };
      });


    }

  };

};
