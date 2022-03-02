const db = require("./testDb");
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const UserCoin = require("../models/userCoinSchema");
const Transaction = require("../models/transactionSchema");
const { testUser, testTransaction } = require("./testSampleData");
const expect = chai.expect;

chai.use(chaiHttp);

describe('Portfolio routes', () => {
  let token;
  const loginBody = {
    username: testUser.username,
    password: testUser.password
  }
  const registerBody = {
    username: testUser.username,
    password: testUser.password,
    confirmPassword: testUser.password
  };

  before(async () => {
    await db.connect();
    await chai.request(app)
      .post('/api/auth/register')
      .send(registerBody)

    const loginRes = await chai.request(app)
      .post('/api/auth/login')
      .send(loginBody);
    token = loginRes.body.token;
  });

  after(async () => {
    await db.disconnect();
  })


  describe('Create transactions', () => {
    it('it should create a transaction', async () => {
      const res = await chai.request(app)
        .post('/api/portfolio/transaction/create')
        .set({ token })
        .send(testTransaction)
      expect(res).to.have.status(200);
    })

    it('it should not create a transaction with invalid input', async () => {
      const invalidSymbolRes = await chai.request(app)
        .post('/api/portfolio/transaction/create')
        .set({ token })
        .send({ ...testTransaction, symbol: 'simboloinvalido'});

      const invalidAmountRes = await chai.request(app)
        .post('/api/portfolio/transaction/create')
        .set({ token })
        .send({ ...testTransaction, amount: undefined});

      expect(invalidSymbolRes).to.have.status(400);
      expect(invalidAmountRes).to.have.status(400);
    })
  })

  describe('Update transaction', () => {
    it('it should update transactions', async () => {
      const transaction = await Transaction.findOne({});
      const { _id: id } = transaction;

      const res = await chai.request(app)
        .post('/api/portfolio/transaction/update')
        .set({ token })
        .send({ transactionId: id, amount: 300, price: 300 });

      expect(res).to.have.status(200);

      const updatedTransaction = await Transaction.findOne({ _id: id });
      expect(updatedTransaction.amount).to.equal(300);
      expect(updatedTransaction.price).to.equal(300);
    })

    it('it should correctly update coin amount', async () => {
      const transaction = await Transaction.findOne({});
      const oldTransactionAmount = transaction.amount;
      const oldCoinAmount = (await UserCoin.findOne({ _id: transaction.coin })).amount;

      const res = await chai.request(app)
        .post('/api/portfolio/transaction/update')
        .set({ token })
        .send({ transactionId: transaction.id, amount: 100 });

      const newTransactionAmount = (await Transaction.findOne({ _id: transaction.id })).amount;
      const newCoinAmount = (await UserCoin.findOne({ _id: transaction.coin })).amount;
      expect(newCoinAmount).to.equal(oldCoinAmount - (oldTransactionAmount - newTransactionAmount));
    })
  })
});