module.exports = [
    {
        method: "POST",
        path: "/send-magic-link",
        handler: "auth.sendMagicLink",
        config: {
            auth: false,
            policies: [],
            description:
                "Register/Login in Stytch with magic link",
            tag: {
                plugin: "strapi-provider-stytch",
                name: "Register stytch user",
                actionType: "create",
            },
        },
    },
    {
        method: "POST",
        path: "/send-sms",
        handler: "auth.sendSMS",
        config: {
            auth: false,
            policies: [],
            description:
                "Register/Login in Stytch with whatsapp sms",
            tag: {
                plugin: "strapi-provider-stytch",
                name: "Register stytch user",
                actionType: "create",
            },
        },
    },
    {
        method: "GET",
        path: "/email-login",
        handler: "auth.emailLogin",
        config: {
            auth: false,
            policies: [],
            description:
                "Login using email",
            tag: {
                plugin: "strapi-provider-stytch",
                name: "Email Login",
            },
        },
    },
    {
        method: "POST",
        path: "/sms-login",
        handler: "auth.smsLogin",
        config: {
            auth: false,
            policies: [],
            description:
                "SMS Login",
            tag: {
                plugin: "strapi-provider-stytch",
                name: "SMS Login",
            },
        },
    },
    {
        method: "POST",
        path: "/wallet-login",
        handler: "auth.walletLogin",
        config: {
            auth: false,
            policies: [],
            description:
                "Wallet Login",
            tag: {
                plugin: "strapi-provider-stytch",
                name: "Wallet Login",
            },
        },
    },
    {
        method: "GET",
        path: "/oauth-login",
        handler: "auth.oAuthLogin",
        config: {
            auth: false,
            policies: [],
            description:
                "oAuth Login",
            tag: {
                plugin: "strapi-provider-stytch",
                name: "oAuthLogin",
            },
        },
    },

]