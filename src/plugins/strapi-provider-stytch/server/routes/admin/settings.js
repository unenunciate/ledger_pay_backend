module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: 'stytchController.index',
        config: { policies: [] }
    },
    {
        method: 'GET',
        path: '/settings',
        handler: 'stytchController.getSettings',
        config: {
            policies: [
                {
                    name: 'admin::hasPermissions',
                    config: {
                        actions: ['plugin::strapi-provider-stytch.settings.read'],
                    },
                },
            ],
        }
    },
    {
        method: 'PUT',
        path: '/settings',
        handler: 'stytchController.updateSettings',
        config: {
            policies: [
                {
                    name: 'admin::hasPermissions',
                    config: {
                        actions: ['plugin::strapi-provider-stytch.settings.update'],
                    },
                },
            ],
        }
    },
]