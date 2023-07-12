require('dotenv').config();

const {Web3} = require('web3');
const apiKey = process.env['apikey']
const network = 'goerli';

const node = `https://eth.getblock.io/${apiKey}/${network}/`
const web3 = new Web3(node)


//create account function
const accountTo = web3.eth.accounts.create();
// console.log(accountTo.address);

//send ether across the private key
const privateKey = process.env['privateKey'];
const accountFrom = web3.eth.accounts.privateKeyToAccount(privateKey);

const createSignedTx = async(rawTx) => {
    rawTx.gas = await web3.eth.estimateGas(rawTx);
    return await accountFrom.signTransaction(rawTx);
}

const sendSignedTx = async(signedTx) => {
    web3.eth.sendSignedTransaction(signedTx.rawTransaction).then(console.log)
}

const amounTo = '0.01' //ether
const rawTx = {
    to: accountTo.address,
    value: web3.utils.toWei(amounTo, "ether")
}

createSignedTx(rawTx).then(sendSignedTx);