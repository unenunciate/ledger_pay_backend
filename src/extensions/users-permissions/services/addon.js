'use strict';

const { ClientConfigurations } = require('../../../ClientConfigurations');

/**
 * contract service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = {
    plus: (data) => {
        const user = strapi.entityService.create('plugin::user-permissions.user', {
            fields: ['username', 'id', 'EOA'],
            data: {
                ...data
            },
        });

        for(let i = 0; i < ClientConfigurations.length - 1; i++) {
            strapi.service('api::contract.contract').deploy(user, ClientConfigurations.Chain[i].id)
        }
    }
}
