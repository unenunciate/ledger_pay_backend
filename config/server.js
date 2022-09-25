module.exports = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
      keys: JSON.parse(env('APP_KEYS')),
    },
    ethers: {
      enabled: true,
      publicKey: env("GAS_PUBLIC_KEY"),
      privateKey: env("GAS_PRIVATE_KEY"),
    },
  }
);
