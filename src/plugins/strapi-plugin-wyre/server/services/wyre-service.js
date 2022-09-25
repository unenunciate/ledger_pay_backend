'use strict';

/**
 * wyre-service.js
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const { sanitize } = require('@strapi/utils');
const axios = require('axios').default;

module.exports = (
  {
    strapi
  }
) => {
  return {


    async initialize() {

    },

    async createOrder(paymentOrder, wyreProfile) {
      strapi.log.debug("Creating wallet order reservation");
      const { reservation } = await this.wyreCreateWalletReservation(paymentOrder);

      strapi.log.debug(reservation);
      if (!reservation) {
        return;
      }
      strapi.log.debug("Wallet reservation created, creating order....")

      const response = await this.wyreCreateOrder(reservation, paymentOrder, wyreProfile);
      return response;
    },

    async wyreCreateOrder(reservationId, paymentOrder, wyreProfile) {
      strapi.log.debug("wyreService.createPaymentOrder");

      const secretKey = strapi.config.get('wyre.wyre_secret_key');
      const referrerAccountId = strapi.config.get('wyre.wyre_account_id');
      const { debitCards, addresses, user } = wyreProfile;
      const { amount, sourceCurrency, destCurrency, dest } = paymentOrder;
      const srn = "ethereum:".concat(dest);
      const bearerToken = 'Bearer '.concat(secretKey);
      const axios = require('axios').default;

      const options = {
        method: 'POST',
        url: 'https://api.testwyre.com/v3/debitcard/process/partner',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: bearerToken
        },
        data: {
          debitCard: {
            number: debitCards[0].number,
            year: debitCards[0].year,
            month: debitCards[0].month,
            cvv: debitCards[0].cvv
          },
          address: addresses[0],
          reservationId: reservationId,
          trigger3ds: true,
          amount: amount,
          sourceCurrency: sourceCurrency,
          destCurrency: destCurrency,
          dest: srn,
          referrerAccountId: referrerAccountId,
          givenName: user.givenName,
          familyName: user.familyName,
          email: user.email,
          phone: user.phone,
          ipAddress: '1.1.1.1'
        }
      };

      try {
        const { data } = await axios.request(options);
        return data;
      } catch (err) {
        return err;
      }
    },



    async wyreCreateWalletReservation(paymentOrder) {
      strapi.log.debug("wyreService.createWalletReservation");
      const { amount, sourceCurrency, destCurrency, dest } = paymentOrder;
      const referrerAccountId = strapi.config.get('wyre.wyre_account_id');
      const secretKey = strapi.config.get('wyre.wyre_secret_key');
      const bearerToken = 'Bearer '.concat(secretKey);
      const srn = "ethereum:".concat(dest);
      const options = {
        method: 'POST',
        url: 'https://api.testwyre.com/v3/orders/reserve',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: bearerToken
        },
        data: {
          sourceAmount: amount,
          paymentMethod: 'debit-card',
          amountIncludeFees: true,
          sourceCurrency: sourceCurrency,
          destCurrency: destCurrency,
          referrerAccountId: referrerAccountId,
          dest: srn,
          country: 'US'
        }
      };

      try {
        const { data } = await axios.request(options);
        return data;
      } catch (err) {
        return err;
      }
    },


    async sanitizeWyreProfile(wyreProfile) {
      const wyreProfileSchema = strapi.getModel('plugin::strapi-plugin-wyre.wyre-profile')
      let sanitizedWyreProfile = await sanitize.sanitizers.defaultSanitizeOutput(wyreProfileSchema)
      if (!sanitizedWyreProfile.id && wyreProfile.id) {
        sanitizedWyreProfile.id = wyreProfile.id;
      }
      return sanitizedWyreProfile;
    },
    async createWithdrawOrder(withdrawOrder, wyreProfile) {
      strapi.log.debug("Creating wallet order reservation");

      const { bank } = wyreProfile;



      if (!bank) {
        return;
      }
      strapi.log.debug("Withdraw order created")


      return bank;
    },


  };



};
