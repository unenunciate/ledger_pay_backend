'use strict';

/**
 * stytch-service.js
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const stytch = require("stytch")
const { ApplicationError } = require('@strapi/utils').errors;




const _ = require("lodash");
const crypto = require("crypto");
const { sanitize } = require('@strapi/utils');
const { nanoid } = require("nanoid");
const { loginOrCreateMagicLink, emailConfirmation } = require("../controllers/auth");
const { copyFile } = require("fs");

const client = new stytch.Client({
  project_id: strapi.config.get('stytch.project_id'),
  secret: strapi.config.get('stytch.secret_key'),
  env: stytch.envs.test,
});

module.exports = (
  {
    strapi
  }
) => {
  return {


    async initialize() {

    },

    settings() {
      const pluginStore = strapi.store({
        environment: '',
        type: 'plugin',
        name: 'strapi-provider-stytch',
      });
      return pluginStore.get({ key: 'settings' });
    },

    userSettings() {
      const pluginStore = strapi.store({
        environment: '',
        type: 'plugin',
        name: 'users-permissions',
      });
      return pluginStore.get({ key: 'advanced' });
    },

    async isEnabled() {
      const settings = await this.settings();
      return !!settings.enabled;
    },

    async createUser(stytchUUID) {
      strapi.log.debug('stytchService.createUser');
      const userSettings = await this.userSettings();
      const role = await strapi
        .query('plugin::users-permissions.role')
        .findOne({
          where: { type: userSettings.default_role }
        });

      const newUser = {
        stytchUUID: stytchUUID,
        username: stytchUUID,
        role: { id: role.id }
      };
      return strapi
        .query('plugin::users-permissions.user')
        .create({ data: newUser, populate: ['role'] });
    },

    async user(data) {
      strapi.log.debug('stytchService.user');
      console.log(data);
      const settings = await this.settings();
      const { stytchUUID, username, domainName } = data;
      const user = stytchUUID ? await this.fetchUser({ stytchUUID }) : null;
      if (user) {
        return user;
      }
      const userByUsername = username ? await this.fetchUser({ username }) : null;
      if (userByUsername) {
        return userByUsername;
      }
      const userByDomainName = domainName ? await this.fetchUser({ domainName }) : null;
      if (userByDomainName) {
        return userByDomainName;
      }

      if (stytchUUID && settings.createUserIfNotExists) {
        return await this.createUser(stytchUUID)
      }

      return false;
    },

    async fetchUser(data) {
      const userSchema = strapi.getModel('plugin::users-permissions.user');
      const user = await strapi.query('plugin::users-permissions.user').findOne({ where: data, populate: ['role'] })
      if (!user) {
        return user;
      }
      let sanitizedUser = await sanitize.sanitizers.defaultSanitizeOutput(userSchema, user);
      if (!sanitizedUser.stytchUUID && user.stytchUUID) {
        sanitizedUser.stytchUUID = user.stytchUUID
      }
      return sanitizedUser
    },



    async getUserFromStytch(stytchUUID) {
      return await client.users.get(stytchUUID)

    },


    async sendMagicLink(email) {
      const params = {
        email: email,
        login_magic_link_url: 'http://localhost:1337/api/strapi-provider-stytch/email-login',
        signup_magic_link_url: 'http://localhost:1337/api/strapi-provider-stytch/email-login',
      }
      const response = await client.magicLinks.email.loginOrCreate(params);
      return response.user_id;
    },


    async sendSMS(phoneNumber) {

      const params = {
        phone_number: phoneNumber,
      }
      const response = await client.otps.whatsapp.loginOrCreate(params); //sends whatsapp
      return ({ "userId": response.user_id, "phoneId": response.phone_id });
    },



    async walletLogin(walletAddress, signature) {
      const params = {
        crypto_wallet_address: walletAddress,
        crypto_wallet_type: "ethereum",
        signature: signature,
        session_duration_minutes: 60,
      };
      const { session_token, user_id } = await client.cryptoWallets.authenticate(params)

      await this.user({ stytchUUID: user_id });
      return session_token;
    },

    async emailLogin(token) {

      const { session_token, user_id } = await client.magicLinks.authenticate(token, { session_duration_minutes: 60 });

      await this.user({ stytchUUID: user_id });
      return session_token;
    },


    async smsLogin(phoneId, code) {
      strapi.log.debug("stytchService.smsLogin");

      const params = {
        "method_id": phoneId,
        "code": code,
        "session_duration_minutes": 60,
      }

      const { session_token, user_id } = await client.otps.authenticate(params);

      await this.user({ stytchUUID: user_id });
      return session_token;
    },


    async oAuthLogin(token) {
      strapi.log.debug("StytchService.addProvider")
      const params = {
        token: token,
        session_duration_minutes: 60,
      };
      const { session_token, user_id } = await client.oauth.authenticate(params)

      await this.user({ stytchUUID: user_id });
      return session_token;
    },


    async deleteWallet(walletId) {
      strapi.log.debug("StytchService.deleteWallet")

      try {
        const { user } = await client.users.deleteCryptoWallet(walletId);
        return user.crypto_wallets;

      } catch (err) {
        console.log(err);
        return err.error_message;
      }
    },


    async deletePhone(phoneId) {
      strapi.log.debug("StytchService.deletePhone")
      strapi.log.debug(phoneId);

      try {
        const { user } = await client.users.deletePhoneNumber(phoneId)
        return user.phone_numbers;

      } catch (err) {
        console.log(err);
        return err.error_message;
      }
    },


    async deleteEmail(emailId) {
      strapi.log.debug("StytchService.deleteEmail")
      console.log(emailId);

      try {
        const { user } = await client.users.deleteEmail(emailId)
        return user.emails;

      } catch (err) {
        console.log(err);
        return err.error_message;
      }

    },

    //delete provider not needed

  };
};
