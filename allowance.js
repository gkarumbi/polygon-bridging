const {POSClient,use } = require('@maticnetwork/maticjs');
const {Web3ClientPlugin} = require('@maticnetwork/maticjs-ethers');

const {ethers} = require('ethers');

require("dotenv").config();

use(Web3ClientPlugin)

const postClient = new POSClient();
const parentProvider = ethers.getDefaultProvider("goerli");
const childProvider = ethers.getDefaultProvider(" https://rpc-mumbai.matic.today");

async function test(){
    await postClient.init({
        log:true,
        network: "testnet",
        version: "mumbai",
        parent:{
            provider: new ethers.Wallet(process.env.PRIVATE_KEY, parentProvider),
            defaultConfig : {
                from: process.env.WALLET_ADDRESS,
            },
        },
        child:{
            provider: new ethers.Wallet(process.env.PRIVATE_KEY, childProvider),
            defaultConfig:{
                from:process.env.WALLET_ADDRESS
            },
        }
    })
     const erc20Token = postClient.erc20(process.env.ROOT_TOKEN,true);
     const balance = await erc20Token.getAllowance(process.env.WALLET_ADDRESS);

     console.log("allowance --", balance)
}


console.log(test());