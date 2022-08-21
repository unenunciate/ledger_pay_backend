module.exports = [
    {"name": 'strapi::errors'},
    {"name": 'strapi::security'},
    {
      "name": 'strapi::cors',
      "config": {
        "origin": ['slimchance.bet', 'www.slimchance.bet', 'localhost'],
        "methods": ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
        "headers": ['Content-Type', 'Authorization', 'Origin', 'Accept'],
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
