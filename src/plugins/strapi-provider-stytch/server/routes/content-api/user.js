module.exports = [
    {
        method: 'GET',
        path: '/:stytchUUID',
        handler: 'user.getUserFromStytch',
        config: {
            description:
                'Get user using StytchUUID',
        },
    },
    {
        method: 'POST',
        path: '/:stytchUUID',
        handler: 'user.createUserFromStytch',
        config: {
            description:
                'Create user using StytchUUID',
        },
    },
]