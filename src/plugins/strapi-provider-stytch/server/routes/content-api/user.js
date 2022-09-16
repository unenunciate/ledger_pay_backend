module.exports = [
    {
        method: 'GET',
        path: '/',
        handler: 'user.index',
        config: {
            middlewares: ['plugin::strapi-provider-stytch.isRegistered'],
            description:
                'index page',

        },
    },
    {
        method: 'GET',
        path: '/users/:stytchUUID',
        handler: 'user.getUserFromStytch',
        config: {
            middlewares: ['plugin::strapi-provider-stytch.isRegistered'],
            description:
                'Get user using StytchUUID',
        },
    },
    {
        method: "DELETE",
        path: "/deletePhone/:phoneId",
        handler: "user.deletePhone",
        config: {
            middlewares: ['plugin::strapi-provider-stytch.isRegistered'],
            description:
                "Add cryptocurrency wallet to user",
        },
    },
    {
        method: "DELETE",
        path: "/deleteEmail/:emailId",
        handler: "user.deleteEmail",
        config: {
            middlewares: ['plugin::strapi-provider-stytch.isRegistered'],
            description:
                "Add cryptocurrency wallet to user",
        },
    },
    {
        method: "DELETE",
        path: "/deleteWallet/:walletId",
        handler: "user.deleteWallet",
        config: {
            middlewares: ['plugin::strapi-provider-stytch.isRegistered'],
            description:
                "Add cryptocurrency wallet to user",
        },
    },

]