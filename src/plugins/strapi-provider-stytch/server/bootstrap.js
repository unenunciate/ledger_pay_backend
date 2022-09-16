'use strict';

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 */
const { getAbsoluteServerUrl } = require('@strapi/utils');

const stytchActions = {
  actions: [
    {
      // Settings
      section: 'plugins',
      displayName: 'Read',
      uid: 'settings.read',
      subCategory: 'Settings',
      pluginName: 'strapi-provider-stytch',
    },
    {
      // Settings Update
      section: 'plugins',
      displayName: 'Edit',
      uid: 'settings.update',
      subCategory: 'Settings',
      pluginName: 'strapi-provider-stytch',
    },
  ],
};

module.exports = async (
  {
    strapi
  }
) => {
  const pluginStore = strapi.store({
    environment: '',
    type: 'plugin',
    name: 'strapi-provider-stytch',
  });
  const settings = await pluginStore.get({ key: 'settings' });

  if (!settings) {
    const value = {
      enabled: true,
      createUserIfNotExists: true,
      expire_period: 3600,
      object: 'Stytch Login',
    };

    await pluginStore.set({ key: 'settings', value });
  }

  await strapi.admin.services.permission.actionProvider.registerMany(
    stytchActions.actions
  );
  //await strapi.plugin('users-permissions').service('strapi-provider-stytch').initialize()
};
