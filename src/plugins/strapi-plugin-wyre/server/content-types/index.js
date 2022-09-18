'use strict';

const wyreProfile = require("./wyre-profile")
const address = require('./address');
const debitCard = require('./debit-card')


module.exports = {
    "wyre-profile": wyreProfile,
    "address": address,
    "debit-card": debitCard,

};
