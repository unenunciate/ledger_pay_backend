module.exports = [
    {
        method: "POST",
        path: "/create-user",
        handler: "wyre.createUser",
        config: {
            middlewares: ['plugin::strapi-provider-stytch.isRegistered'],
            description:
                "Create user in wyre",
            tag: {
                plugin: "strapi-provider-stytch",
                name: "Register stytch user",
                actionType: "create",
            },
        },
    },
    {
        method: "POST",
        path: "/send-magic-link",
        handler: "auth.sendMagicLink",
        config: {
            middlewares: ['plugin::strapi-provider-stytch.isRegistered'],
            description:
                "Register/Login in Stytch with magin link",
            tag: {
                plugin: "strapi-provider-stytch",
                name: "Register stytch user",
                actionType: "create",
            },
        },
    },
    {
        method: "POST",
        path: "/send-magic-link",
        handler: "auth.sendMagicLink",
        config: {
            middlewares: ['plugin::strapi-provider-stytch.isRegistered'],
            description:
                "Register/Login in Stytch with magin link",
            tag: {
                plugin: "strapi-provider-stytch",
                name: "Register stytch user",
                actionType: "create",
            },
        },
    },
    {
        method: "POST",
        path: "/send-magic-link",
        handler: "auth.sendMagicLink",
        config: {
            auth: false,
            policies: [],
            description:
                "Register/Login in Stytch with magin link",
            tag: {
                plugin: "strapi-provider-stytch",
                name: "Register stytch user",
                actionType: "create",
            },
        },
    },
    {
        method: "POST",
        path: "/send-magic-link",
        handler: "auth.sendMagicLink",
        config: {
            auth: false,
            policies: [],
            description:
                "Register/Login in Stytch with magin link",
            tag: {
                plugin: "strapi-provider-stytch",
                name: "Register stytch user",
                actionType: "create",
            },
        },
    },

]