module.exports = [
    {"name": 'strapi::errors'},
    {
      name: 'strapi::security',
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            'connect-src': ["'self'", 'https:'],
            'img-src': [
              "*",
              "'self'",
              'data:',
              'blob:',
              'dl.airtable.com',
              'yourBucketName.s3.yourRegion.amazonaws.com',
            ],
            'media-src': [
              "'self'",
              'data:',
              'blob:',
              'dl.airtable.com',
              'yourBucketName.s3.yourRegion.amazonaws.com',
            ],
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    {
      "name": 'strapi::cors',
      "config": {
        "enabled": true,
        "origin": ["*"],
        "methods": ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        "headers": "*",
        "keepHeaderOnError": true,
      }
    },
    {"name": 'strapi::poweredBy'},
    {"name": 'strapi::logger'},
    {"name": 'strapi::query'},
    {"name": 'strapi::body'},
    {"name": 'strapi::session'},
    {"name": 'strapi::favicon'},
    {"name": 'strapi::public'},
  ]
