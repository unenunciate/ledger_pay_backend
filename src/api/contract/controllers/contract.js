'use strict';

const { ClientConfigurations } = require('../../../../ClientConfigurations');
const { ethers } = require('ethers');
const shappire = require('@oasisprotocol/sapphire-paratime');
const walletProxyJson = require("src/utils/LedgerPayWalletProxy.json");
const FIFSRegistrarJson = require("src/utils/FIFSRegistrar.json");
/**
 * contract controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::contract.contract', (strapi) => ({
    create: async (ctx, user, label) => {
       const { chainId } = ctx.body;
       const config = ClientConfigurations.find((c) => c.Chain.id === chainId);

       const provider = new ethers.providers.JsonRpcProvider(config.Chain.rpcUrls.public, {chainId: config.Chain.id, ensAddress: config.Chain.ens.address, name: config.Chain.network });

       let wallet;
       if(config.Chain.id === 23295) {
           wallet = shappire.wrap(new ethers.Wallet(strapi.config("ethers").get('OasisPrivateKey'), provider));
       } else {
           wallet = new ethers.Wallet(strapi.config("ethers").get('PrivateKey'), provider)
       }

       let worldIdContract = ethers.constants.AddressZero;

       if(config.chainId.id == 137) {
           worldIdContract = "0xD81dE4BCEf43840a2883e5730d014630eA6b7c4A"
       }

       const WALLETFACTORY = await ethers.getContractFactory(walletProxyJson.abi, walletProxyJson.bytecode, wallet);

        //TODO: store this wallet in the database
       const walletContract = await WALLETFACTORY.deploy(config.entryPointAddress, user, config.walletImplementation, worldIdContract);

       const REG = await ethers.getContractFactory(FIFSRegistrarJson.abi, FIFSRegistrarJson.bytecode, wallet);

       const registrar = await REG.attach(config.registrar);

       if(label != "") {

        await registrar.register(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(label)), user)

       }

    }
}));
