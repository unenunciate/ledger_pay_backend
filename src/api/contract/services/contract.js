'use strict';


const { ClientConfigurations } = require('../../../ClientConfigurations');
const { ethers } = require('ethers');
const shappire = require('@oasisprotocol/sapphire-paratime');
const walletProxyJson = require("../../../utils/LedgerPayWalletProxy.json");
const FIFSRegistrarJson = require("../../../utils/FIFSRegistrar.json");

/**
 * contract service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::contract.contract', (strapi) => ({
    deploy: async (user, chainId) => {
       const config = ClientConfigurations.find((c) => c.Chain.id === chainId);

       const provider = new ethers.providers.JsonRpcProvider(config.Chain.rpcUrls.public, {chainId: config.Chain.id, ensAddress: config.Chain.ens.address, name: config.Chain.network });

       let wallet;

       if(config.Chain.id === 23295) {
           wallet = shappire.wrap(new ethers.Wallet(strapi.config("ethers").get('privateKey'))).connect(provider);
       } else {
           wallet = new ethers.Wallet(strapi.config("ethers").get('privateKey'), provider)
       }

       let worldIdContract = ethers.constants.AddressZero;

       if(config.chainId.id == 137) {
           worldIdContract = "0xD81dE4BCEf43840a2883e5730d014630eA6b7c4A";
       }

       const WALLETFACTORY = await ethers.getContractFactory(walletProxyJson.abi, walletProxyJson.bytecode, wallet);

        //TODO: store this wallet in the database
       const walletContract = await WALLETFACTORY.deploy(config.entryPointAddress, user.EOA, config.walletImplementation, worldIdContract);
       
       const newWalletId = await strapi.entityService.create('api::contract.contract', {
            fields: ['id', 'chainId'],
            data: {
                chainId: chainId,
                address: walletContract,
                deployed: true,
                user: user.id,
                hasFlow: true,
                hasWyre: true,
                hasWorldcoin: true,
                initalOwner: user.EOA,
                ower: user.EOA,
                hasENS: true,
                salt: {},
            },
        });

       const wallets = await strapi.entityService.findOne('plugin::user-permissions.user', user.id, {
            fields: ['wallets'],
       });

       await strapi.entityService.update('plugin::user-permissions.user', {
            fields: ['username', 'id', 'EOA'],
            data: {
                wallets: [...wallets, newWalletId.id]
            },
        });

       const REG = await ethers.getContractFactory(FIFSRegistrarJson.abi, FIFSRegistrarJson.bytecode, wallet);

       const registrar = await REG.attach(config.registrar);

       if(user.username != "") {
            await registrar.register(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(user.username)), user.EOA)
       }
    }
}));
