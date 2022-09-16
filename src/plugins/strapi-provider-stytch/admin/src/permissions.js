const pluginPermissions = {
    main: [
        { action: 'plugin::strapi-provider-stytch.main', subject: null }
    ],
    readSettings: [
        { action: 'plugin::strapi-provider-stytch.settings.read', subject: null },
    ],
    updateSettings: [
        { action: 'plugin::strapi-provider-stytch.settings.update', subject: null },
    ],

};

export default pluginPermissions;