'use strict';

/**
 * wyre-service.js
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const request = require('request');
const { createPaymentOrder } = require('../controllers/wyre-controller');

const getOptions = {
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

    async createPaymentOrder(paymentOrder, wyreProfile) {

      const { reservation } = this.createPaymentReservation(paymentOrder);

      const request = require('request');

      const options = {
        method: 'POST',
        url: 'https://api.testwyre.com/v3/debitcard/process/partner',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: {
          "debitCard": paymentOrder.debitcard,
          reservationId: reservation,
          trigger3ds: true,
          amount: paymentOrder.amount,
          sourceCurrency: paymentOrder.sourceCurrency,
          destCurrency: paymentOrder.destCurrency,
          dest: paymentOrder.dest,
          referrerAccountId: 'AC_Y22RAQSKYV6',
          givenName: wyreProfile.givenName,
          familyName: wyreProfile.familyName,
          email: wyreProfile.email,
          ipAddress: '1.1.1.1',
          phone: wyreProfile.phone,
          address: {
            street1: wyreProfile.street1,
            city: wyreProfile.city,
            state: wyreProfile.state,
            postalCode: wyreProfile.postalCode,
            country: wyreProfile.country,
          }
        },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
      });



    },

    async createPaymentReservation(paymentOrder) {
      const options = {
        method: 'POST',
        url: 'https://api.testwyre.com/v3/orders/reserve',
        headers: { accept: 'application/json', 'content-type': 'application/json' },
        body: {
          amountIncludeFees: true,
          sourceAmount: paymentOrder.amount,
          sourceCurrency: paymentOrder.sourceCurrency,
          destCurrency: paymentOrder.destCurrency,
          referrerAccountId: 'AC_YV8LCV3C9HZ',
          dest: paymentOrder.dest,
        },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);

        return body;
      });
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
