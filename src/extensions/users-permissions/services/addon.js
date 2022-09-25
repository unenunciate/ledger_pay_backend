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

        }
    }
}
