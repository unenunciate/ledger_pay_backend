module.exports = ({ env }) => ({
  "random-sort": {
    enabled: true,
  },

  sitemap: {
    enabled: true,
  },

  sentry: {
    enabled: env("NODE_ENV") === "production",
    config: {
      dsn: env("SENTRY_DSN"),
      sendMetadata: true,
    },
  },

  editorjs: {
    enabled: true,
  },

  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        accessKeyId: env("AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("AWS_ACCESS_SECRET"),
        region: env("AWS_REGION"),
        params: {
          Bucket: env("AWS_BUCKET"),
        },
      },
      actionOptions: {
        upload: {
          enabled: true,
        },
        uploadStream: {},
        delete: {},
      },
    },
  },

  "fuzzy-search": {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: "plugin::user-permissions.user",
          modelName: "user",
          fuzzysortOptions: {
            characterLimit: 300,
            threshold: -600,
            limit: 10,
            keys: [
              {
                username: "username",
                weight: 100,
              },
            ],
          },
        },
      ],
    },
  },
  // enable a custom plugin
  "strapi-provider-stytch": {
    // my-plugin is going to be the internal name used for this plugin
    enabled: true,
    resolve: "./src/plugins/strapi-provider-stytch",
    config: {
      // user plugin config goes here
    },
  },

  "strapi-plugin-wyre": {
    // my-plugin is going to be the internal name used for this plugin
    enabled: true,
    resolve: "./src/plugins/strapi-plugin-wyre",
    config: {
      // user plugin config goes here
    },
  },
});
