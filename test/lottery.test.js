const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');


let accounts;
let lottery;

beforeEach(async () => {
accounts = await web3.eth.getAccounts();
lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data: bytecode})
    .send({ gas:'3000000', from: accounts[0]});
})

describe('Lottery Contract', () => {
    it('deploys a contract', () => {
         assert.ok(lottery.options.address);
    });

    it('allows one user to enter', async () => {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: '1000000000000000000'
      });

      const customers = await lottery.methods.getCustomers().call({
        from: accounts[0]
      });

        assert.equal(accounts[0], customers[0]);
        assert.equal(1, customers.length);
    })

     it('allows multiple user to enter', async () => {
      await lottery.methods.enter().send({
        from: accounts[0],
        value: '1000000000000000000'
      });
       await lottery.methods.enter().send({
        from: accounts[1],
        value: '1000000000000000000'
      });
       await lottery.methods.enter().send({
        from: accounts[2],
        value: '1000000000000000000'
      });

      const customers = await lottery.methods.getCustomers().call({
        from: accounts[0]
      });

        assert.equal(accounts[0], customers[0]);
        assert.equal(accounts[1], customers[1]);
        assert.equal(accounts[2], customers[2]);
        assert.equal(3, customers.length);
    })

    it('requires a minimum amount of ether to enter', async () => {
    try{
      await lottery.methods.enter().send({
         from: accounts[0],
         value: '1000000000000000000'
         });
         assert(false);
    } catch (err) {
       assert(err);
    }

    })

    it('only a manager can call lotteryPicker', async () => {
    try{
      await lottery.methods.selectWinner().send({
         from: accounts[1],
         });
         assert(false);
    } catch (err) {
       assert(err);
    }

    })


})
