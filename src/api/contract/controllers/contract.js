'use strict';

const { ClientConfigurations } = require('../../../../ClientConfigurations');
const { ethers } = require('ethers');
const shappire = require('@oasisprotocol/sapphire-paratime');
/**
 * contract controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contract.contract', (strapi) => ({
    create: async (ctx) => {
       const { chainId } = ctx.body;
       const config = ClientConfigurations.find((c) => c.Chain.id === chainId);

       const provider = new ethers.providers.JsonRpcProvider(config.Chain.rpcUrls.public, {chainId: config.Chain.id, ensAddress: config.Chain.ens.address, name: config.Chain.network });

       let wallet;
       if(config.Chain.id === 23295) {
           wallet = shappire.wrap(new ethers.Wallet(strapi.config("ethers").get('privateKey'), provider));
       } else {
           wallet = new ethers.Wallet(strapi.config("ethers").get('privateKey'), provider)
       }


       
       wallet.sendTransaction()
    }
}));
