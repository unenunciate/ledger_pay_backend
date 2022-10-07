module.exports = [
  {
    method: "POST",
    path: "/create-payment-order",
    handler: "wyreController.createPaymentOrder",
    policies: ["plugin::strapi-provider-stytch.isAuthenticated"],
    config: {
      description: "Create",
      tag: {
        plugin: "strapi-plugin-wyre",
        name: "Create payment order",
        actionType: "create",
      },
    },
  },
  {
    method: "POST",
    path: "/create-withdrawal-order",
    handler: "wyreController.createWithdrawalOrder",
    policies: ["plugin::strapi-provider-stytch.isAuthenticated"],
    config: {
      description: "Create",
      tag: {
        plugin: "strapi-plugin-wyre",
        name: "Create withdrawal order",
        actionType: "create",
      },
    },
  },
  {
    method: "POST",
    path: "/update-profile",
    handler: "wyreController.updateWyreProfile",
    policies: ["plugin::strapi-provider-stytch.isAuthenticated"],
    config: {
      description: "Create paymentorder",
      tag: {
        plugin: "strapi-plugin-wyre",
        name: "Create wyre payment order",
        actionType: "create",
      },
    },
  },
  {
    method: "POST",
    path: "/add-address",
    handler: "wyreController.addAddressToProfile",
    config: {
      description: "Add an address to wyre profile",
      tag: {
        plugin: "strapi-plugin-wyre",
        name: "Create address",
        actionType: "create",
      },
    },
  },
  {
    method: "PUT",
    path: "/update-address",
    handler: "wyreController.updateAddress",
    config: {
      description: "Update an address to wyre profile",
      tag: {
        plugin: "strapi-plugin-wyre",
        name: "Update address",
        actionType: "update",
      },
    },
  },
  {
    method: "POST",
    path: "/add-debit-card",
    handler: "wyreController.addDebitCardToProfile",
    policies: ["plugin::strapi-provider-stytch.isAuthenticated"],
    // policies: [],
    config: {
      description: "Add a debit card to wyre profile",
      tag: {
        plugin: "strapi-plugin-wyre",
        name: "Create debitCard",
        actionType: "create",
      },
    },
  },
  {
    method: "PUT",
    path: "/update-debit-card",
    handler: "wyreController.updateDebitCard",
    policies: ["plugin::strapi-provider-stytch.isAuthenticated"],
    config: {
      description: "Update a debit card",
      tag: {
        plugin: "strapi-plugin-wyre",
        name: "Update debitCard",
        actionType: "update",
      },
    },
  },
  {
    method: "POST",
    path: "/add-bank",
    handler: "wyreController.addBankToProfile",
    policies: ["plugin::strapi-provider-stytch.isAuthenticated"],
    config: {
      description: "Add a bank account to wyre profile",
      tag: {
        plugin: "strapi-plugin-wyre",
        name: "Create Bank",
        actionType: "create",
      },
    },
  },
  {
    method: "PUT",
    path: "/update-bank",
    handler: "wyreController.updateBank",
    policies: ["plugin::strapi-provider-stytch.isAuthenticated"],
    config: {
      description: "Update a bank account",
      tag: {
        plugin: "strapi-plugin-wyre",
        name: "Update Bank",
        actionType: "update",
      },
    },
  },
];
