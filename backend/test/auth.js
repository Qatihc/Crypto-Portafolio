const db = require("./testDb");
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require("../models/userSchema");
const { testUser } = require("./testSampleData");
const expect = chai.expect;

chai.use(chaiHttp);

describe('Auth Routes', () => {

  before(async () => {
    await db.connect();
    await User.deleteMany({});
  });

  after(async () => {
    await User.deleteMany({});
    await db.disconnect();
  })

  const loginBody = {
    username: testUser.username,
    password: testUser.password
  }

  describe('Register', () => {
    it('it should register new user', async () => {
      const body = {
        username: testUser.username,
        password: testUser.password,
        confirmPassword: testUser.password
      };
  
      const res = await chai.request(app)
        .post('/api/auth/register')
        .send(body)
      
      expect(res).to.have.status(200);

      const savedUser = await User.findOne({ username: testUser.username });
      expect(savedUser, 'Usuario no fue guardado en la db.').to.not.be.null;
    })

    it('it should not register user with weak password', async () => {
      const body = {
        username: testUser.username,
        password: 'a',
        confirmPassword: 'a'
      };

      const res = await chai.request(app)
        .post('/api/auth/register')
        .send(body)

        expect(res).to.have.status(400);
    })

    it('it should not register user if passwords doesnt match', async () => {
      const body = {
        username: testUser.username,
        password: testUser.password,
        confirmPassword: testUser.password + 'a'
      };

      const res = await chai.request(app)
      .post('/api/auth/register')
      .send(body)

      expect(res).to.have.status(400);
    })
  })

  describe('Login', () => {
    it('it should login', async () => {
      const res = await chai.request(app)
      .post('/api/auth/login')
      .send(loginBody);

      expect(res).to.have.status(200);
      expect(res.body).to.have.keys('token', 'username');
    })

    it('it should not login with wrong username', async () => {
      const res = await chai.request(app)
      .post('/api/auth/login')
      .send({
        username: testUser.username + 'a',
        password: testUser.password
      });

      expect(res).to.have.status(400);
    })
  })

  describe('Database', () => {
    it('password should not be plain text', async () => {
      const user = await User.findOne({username: testUser.username});
      expect(user.password).to.not.equal(testUser.password)
    })
  })

  describe('Protected routes', () => {
    it('logged user should be able to access protected routes', async () => {
      const login = await chai.request(app)
        .post('/api/auth/login')
        .send(loginBody);

      const { token } = login.body;
      const res = await chai.request(app)
        .get('/api/portfolio/transaction')
        .set({ token })
      
      expect(res).to.have.status(200);
    })

    it('not logged user should not be able to access protected routes', async () => {
      const res = await chai.request(app)
        .get('/api/portfolio/transaction')
      
      expect(res).to.have.status(401);
    })
  })
});