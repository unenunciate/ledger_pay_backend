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
      const { debitCards, addresses, familyName, email, phone, givenName } = wyreProfile;
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
          debitCard: debitCards[0],
          address: addresses[0],
          reservationId: reservationId,
          trigger3ds: true,
          amount: amount,
          sourceCurrency: sourceCurrency,
          destCurrency: destCurrency,
          dest: srn,
          referrerAccountId: referrerAccountId,
          givenName: givenName,
          familyName: familyName,
          email: email,
          phone: phone,
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

    async createWyreUser(wyreProfile) {
      strapi.log.debug("wyreService.createWyreUser");

      const secretKey = strapi.config.get('wyre.wyre_secret_key');
      const bearerToken = 'Bearer '.concat(secretKey);

      const options = {
        method: 'POST',
        url: 'https://api.testwyre.com/v3/orders/reserve',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: bearerToken
        },
        data: {

          "fields": {
            "firstName": wyreProfile.giveName,
            "lastName": wyreProfile.familyName,
            "dateOfBirth": wyreProfile.dateOfBirth,
            "residenceAddress": {
              "street1": wyreProfile.addresses[0].street1,
              "street2": null,
              "city": wyreProfile.addresses[0].city,
              "state": wyreProfile.addresses[0].state,
              "postalCode": wyreProfile.addresses[0].postalCode,
              "country": wyreProfile.addresses[0].country
            }
          },
          "blockchains": [
            "ALL"
          ],
          "immediate": false,
          "scopes": [
            "TRANSFER"
          ]

        }
      };

      try {
        const { data } = await axios.request(options);
        console.log("USer created in wyre: ");
        console.log(data);
        return data;
      } catch (err) {
        return err;
      }
    },

    async createWyrePaymentMethod(wyreProfile, data) {
      strapi.log.debug("wyreService.createWyrePaymentMethod");

      const secretKey = strapi.config.get('wyre.wyre_secret_key');
      const bearerToken = 'Bearer '.concat(secretKey);
      const address = wyreProfile.addresses[0];
      const date = new Date(wyreProfile.dateOfBirth);
      const { accountNumber, routingNumber } = data;


      const options = {
        method: 'POST',
        url: 'https://api.testwyre.com/v3/orders/reserve',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: bearerToken
        },
        data: {
          "paymentMethodType": "INTERNATIONAL_TRANSFER",
          "paymentType": "LOCAL_BANK_WIRE",
          "currency": "USD",
          "country": "US",
          "beneficiaryType": "INDIVIDUAL",
          "firstNameOnAccount": wyreProfile.giveName,
          "lastNameOnAccount": wyreProfile.familyName,
          "beneficiaryAddress": address.street1,
          "beneficiaryAddress2": "",
          "beneficiaryCity": address.city,
          "beneficiaryPostal": address.postalCode,
          "beneficiaryPhoneNumber": wyreProfile.phone,
          "beneficaryState": address.state,
          "beneficiaryDobDay": date.getDate(),
          "beneficiaryDobMonth": date.getMonth(),
          "beneficiaryDobYear": date.getFullYear(),
          "accountNumber": accountNumber,
          "routingNumber": routingNumber,
          "accountType": "CHECKING",
          "chargeablePM": false
        }
      };

      try {
        const { data } = await axios.request(options);
        console.log("Bank account created in wyre: ");
        console.log(data);
        return data;
      } catch (err) {
        return err;
      }
    }


  };



};
