module.exports = [
    {
        method: "POST",
        path: "/create-wallet-reservation",
        handler: "wyre.createWalletReservation",
        config: {
            middlewares: ['plugin::strapi-provider-stytch.isRegistered'],
            description:
                "Create",
            tag: {
                plugin: "strapi-plugin-wyre",
                name: "Create wyre user",
                actionType: "create",
            },
        },
    },
    {
        method: "POST",
        path: "/create-order",
        handler: "wyre.createOrder",
        config: {
            middlewares: ['plugin::strapi-provider-stytch.isRegistered'],
            description:
                "Create paymentorder",
            tag: {
                plugin: "strapi-plugin-wyre",
                name: "Create wyre payment order",
                actionType: "create",
            },
        },
    },
    {
        method: "POST",
        path: "/create-transfer",
        handler: "wyre.createTransfer",
        config: {
            middlewares: ['plugin::strapi-provider-stytch.isRegistered'],
            description:
                "Create transfer to destination",
            tag: {
                plugin: "strapi-plugin-wyre",
                name: "Create transfer",
                actionType: "create",
            },
        },
    },

]