const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
'picture alien fragile own absent town lecture tiny climb before medal raven',
      'https://rinkeby.infura.io/v3/6c311be5afc24ab8adf7c854434639c9'
);

const web3 = new Web3(provider);

const deploy = async () => {
const accounts = web3.eth.getAccounts();
console.log('attempting to deploy from', accounts[0]);


const results = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({from: accounts[0], gas: '300000'});
};

deploy();
