const request = require('supertest')
const db = require('./testDbConnection');
const app = require('../app');
const User = require('../models/userSchema');

const {TEST_USERNAME, TEST_PASSWORD} = require('./testSampleData')

describe('User routes', () => {

  beforeAll(async () => {
    await db.connect();
    await db.mongoose.connection.db.dropDatabase();
  })

  afterAll(async () => {
    await db.mongoose.connection.db.dropDatabase();
    await db.disconnect();
  })

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

  it('should not change username capitalization', async () => {
    const res = await request(app)
    .post('/api/auth/login')
    .send({
      username: TEST_USERNAME,
      password: TEST_PASSWORD
    })

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('username');
    expect(res.body.username).toBe(TEST_USERNAME);
  })
  
})