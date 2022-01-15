const request = require('supertest')
const db = require('./testDbConnection');
const app = require('../app');
const User = require('../models/userSchema');

const {TEST_USERNAME, TEST_PASSWORD, TEST_CHANGE_USERNAME} = require('./testSampleData')

describe('User routes', () => {

  beforeAll(async () => {
    await db.connect();
    await db.mongoose.connection.db.dropDatabase();
  })

  afterAll(async () => {
    await db.mongoose.connection.db.dropDatabase();
    await db.disconnect();
  })

  let userToken;

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

  it('db should not change username capitalization', async () => {
    const res = await request(app)
    .post('/api/auth/login')
    .send({
      username: TEST_USERNAME,
      password: TEST_PASSWORD
    })

    userToken = res.body.token

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('username');
    expect(res.body.username).toBe(TEST_USERNAME);
  })

  it('user should be able to change username', async () => {
    const res = await request(app)
    .post('/api/user/changeUsername')
    .set('token', userToken)
    .send({
      'newUsername': TEST_CHANGE_USERNAME
    })

    // Si cambio el nombre de usuario correctamente, deberia existir un usuario 
    // con el nuevo nombre y ninguno con el nombre anterior
    const changedUser = await User.findOne({username: TEST_CHANGE_USERNAME})
    expect(changedUser).not.toBe(null)

    const oldUser = await User.findOne({username: TEST_USERNAME})
    expect(oldUser).toBe(null)
  })
  
})