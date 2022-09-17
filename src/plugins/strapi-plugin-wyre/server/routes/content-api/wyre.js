module.exports = [
    {
        method: "POST",
        path: "/create-payment-order",
        handler: "wyreController.createPaymentOrder",
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
        path: "/update-profile",
        handler: "wyreController.updateWyreProfile",
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
        path: "/create-wyre-profile",
        handler: "wyreController.createWyreProfile",
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