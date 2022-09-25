const ClientConfigurations = [
    {
        walletImplementation: "0xd45A54D82Ee589720c976d118724895c42D159A2",
        paymasterAddress: "0x1184e555D2C56690cB27936357C5A0507Fb3a5d3",
        entryPointAddress: "0x953284cf7e8494563d79f4361895316690f68af5",
        registrar: "0xb2eA6FeD6276185a5413Ae397E3d6881792B03aA",
        bundlerUrl: "https://polygon.bundler.ledgepay.io",
        logoUrl: "/polygon.png",
        Chain: {
            id: 137,
            name: 'Polygon',
            network: 'polygon',
            nativeCurrency: { name: 'Matic', symbol: 'MATIC', decimals: 18 },
            rpcUrls: {
                public: "https://matic-mainnet.chainstacklabs.com/",
            },
            blockExplorers: {
                default:  "https://polygonscan.com/",
            },
            ens: {
                address: '0xFC1F13cC3D81E2099402e0baFfdA935d617c78c5',
            },
            multicall: {
                address: '0x0',
                blockCreated: 0,
            },
        }
    },
    {
        walletImplementation: "0xc363505A40493723F6019F5cb3B03C319115963F",
        paymasterAddress: "0x871dc4bFa243DB77c08D14d0c66a98d189e2f770",
        entryPointAddress: "0x9d74Dd4C532fdfBEc19Be8D1c31C2223001Aa816",
        registrar: "0x8dDf16be6c8aD764cA2DA1FCc28F5ae83d023BCF",
        bundlerUrl: "https://cronos.bundler.ledgepay.io",
        logoUrl: "/cronos.svg",
        Chain: {
            id: 338,
            name: 'Cronos testnet',
            network: 'cronos',
            nativeCurrency: { name: 'TCRO', symbol: 'TCRO', decimals: 18 },
            rpcUrls: {
                public: "https://evm-t3.cronos.org/",
            },
            blockExplorers: {
                default:  "https://testnet.cronoscan.com/",
            },
            ens: {
                address: '0x44e24cb10ccd14A066deBeF7B9Be11Cb71c8b264',
            },
            multicall: {
                address: '0x0',
                blockCreated: 0,
            },
        }
    },
    {
        walletImplementation: "0x8c06c9ad3c7f7dA8AFB02636a54970B4cCf490f1",
        paymasterAddress: "0x9d74Dd4C532fdfBEc19Be8D1c31C2223001Aa816",
        entryPointAddress: "0x20ed209B16EF395db0F0031A1bbf0F17CA5Aaca4",
        registrar: "0xDe01c60e623961ccebb939cB29ACB737DD7D1bA0",
        bundlerUrl: "https://optimism.bundler.ledgepay.io",
        logoUrl: "/optimism.png",
        Chain: {
            id: 10,
            name: 'Optimism',
            network: 'optimism',
            nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
            rpcUrls: {
                public: "https://mainnet.optimism.io/",
            },
            blockExplorers: {
                default:  "https://optimistic.etherscan.io/",
            },
            ens: {
                address: '0x722e216C59BFb09F0cC0A08B5f37EC2409B59A45',
            },
            multicall: {
                address: '0x0',
                blockCreated: 0,
            },
          }
    },
    {
        walletImplementation: "0x7775695Ea68A2ef91bcB1B06434b8E454c17056f",
        paymasterAddress: "0x871dc4bFa243DB77c08D14d0c66a98d189e2f770",
        entryPointAddress: "0x9d74Dd4C532fdfBEc19Be8D1c31C2223001Aa816",
        registrar: "0x929dd1291b512f16bc2f3827BD462E2a0d118115",
        bundlerUrl: "https://sapphire.bundler.ledgepay.io",
        Chain: {
            id: 23295,
            name: 'Sapphire ParaTime Testnet',
            network: 'sapphire',
            nativeCurrency: { name: 'TEST', symbol: 'TEST', decimals: 18 },
            rpcUrls: {
              public: "https://testnet.sapphire.oasis.dev/",
            },
            blockExplorers: {
              default:  "https://testnet.explorer.sapphire.oasis.dev/",
            },
            ens: {
              address: '0x590C465154bd49D23d402cdb69170F6ba1f678d8',
            },
            multicall: {
              address: '0x0',
              blockCreated: 0,
            },
          }
    }
]

module.exports = {
    ClientConfigurations
}