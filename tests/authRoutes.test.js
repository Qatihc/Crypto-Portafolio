const request = require('supertest')
const db = require('./testDb');
const app = require('../app');
const User = require('../models/userSchema');


const TEST_USERNAME = 'QWEASDFSFFFFFF'.toLowerCase();
const TEST_PASSWORD = 'Qwessss_';
const TEST_CHANGE_PASSWORD = '13143124124124124';
const PROTECED_ROUTE = '/api/portfolio';
const OPTIONAL_AUTH_ROUTE = '/api/coin/topCoins';

describe('Auth routes with correct input', () => {

  beforeAll(async () => {
    await db.connect();
    await db.mongoose.connection.db.dropDatabase();
    await db.disconnect();
  })

  beforeEach(async () => {
    await db.connect();
  });

  afterEach(async () => {
    await db.disconnect();
  });

  it('should register new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: TEST_USERNAME,
        password: TEST_PASSWORD,
        confirmPassword: TEST_PASSWORD
      })

    expect(res.statusCode).toBe(200);
  })

  it('registered user should exist in the db', async () => {
    const user = await User.findOne({username: TEST_USERNAME});
    expect(user).not.toBeNull();
    expect(user.username).toBe(TEST_USERNAME);
  })

  let userToken;

  it('registered user should be able to log in', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: TEST_USERNAME,
        password: TEST_PASSWORD
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('username');
    expect(res.body.user.username).toBe(TEST_USERNAME);

    userToken = res.body.token;
  })

  it('received token should let user log in', async () => {
    const tokenRes = await request(app)
      .post('/api/auth/login')
      .set('token', userToken);

    expect(tokenRes.statusCode).toBe(200);
    expect(tokenRes.body).toHaveProperty('user');
    expect(tokenRes.body.user).toHaveProperty('username');
    expect(tokenRes.body.user.username).toBe(TEST_USERNAME);
  })

  it('user should be able to change their password', async () => {
    const res = await request(app)
      .post('/api/auth/changePassword')
      .send({
        username: TEST_USERNAME,
        password: TEST_PASSWORD,
        newPassword: TEST_CHANGE_PASSWORD,
      });
    
    expect(res.statusCode).toBe(200);
  })

  it('user should be able to log in with new password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: TEST_USERNAME,
        password: TEST_CHANGE_PASSWORD,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toHaveProperty('username');
    expect(res.body.user.username).toBe(TEST_USERNAME);

    userToken = res.body.token;
  })

  it('user should be able to access protected routes when logged', async () => {
    const res = await request(app)
      .get(PROTECED_ROUTE)
      .set('token', userToken);
    
    expect(res.statusCode).toBe(200);
  })

  it('not logged user should not be able to access protected routes', async () => {
    const res = await request(app)
      .get(PROTECED_ROUTE);
    
    expect(res.statusCode).toBe(401);
  })

  it('both logged and not logged users should be able to access optional auth routes', async () => {
    const loggedRes = await request(app)
      .get(OPTIONAL_AUTH_ROUTE)
      .set('token', userToken);
    
    expect(loggedRes.statusCode).toBe(200);

    const notLoggedRes = await request(app)
    .get(OPTIONAL_AUTH_ROUTE)
  
  expect(notLoggedRes.statusCode).toBe(200);
  })

})

describe('Auth routes with invalid input', () => {
  beforeEach(async () => {
    await db.connect();
    await db.mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await db.disconnect();
  });

  test('register post with no form data', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({})

    expect(res.statusCode).toBe(400);
  })

  test('register post with no user name', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        password: TEST_PASSWORD,
        confirmPassword: TEST_PASSWORD
      })

    expect(res.statusCode).toBe(400);
  })

  test('registering same user twice', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        username: TEST_USERNAME,
        password: TEST_PASSWORD,
        confirmPassword: TEST_PASSWORD
      });

    const res = await request(app)
    .post('/api/auth/register')
    .send({
      username: TEST_USERNAME,
      password: TEST_PASSWORD,
      confirmPassword: TEST_PASSWORD
    });

    expect(res.statusCode).toBe(400);
  })

  test('wrong confirm password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: TEST_USERNAME,
        password: TEST_PASSWORD,
        confirmPassword: (TEST_PASSWORD == '') ? 'q' : ''
      })

    expect(res.statusCode).toBe(400);
  })

  test('weak password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: TEST_USERNAME,
        password: '1',
        confirmPassword: '1'
      })

    expect(res.statusCode).toBe(400);
  })
})
