module.exports = ({ env }) => ({

    // enable a custom plugin
    'strapi-provider-stytch': {
        // my-plugin is going to be the internal name used for this plugin
        enabled: true,
        resolve: './src/plugins/strapi-provider-stytch',
        config: {
            // user plugin config goes here
        },
    },

    'strapi-plugin-wyre': {
        // my-plugin is going to be the internal name used for this plugin
        enabled: true,
        resolve: './src/plugins/strapi-plugin-wyre',
        config: {
            // user plugin config goes here
        },
    },
});