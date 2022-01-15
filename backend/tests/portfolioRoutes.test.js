const request = require('supertest')
const db = require('./testDbConnection');
const app = require('../app');
const User = require('../models/userSchema');

const {TEST_USERNAME, TEST_PASSWORD, TEST_CHANGE_USERNAME} = require('./testSampleData')

describe('User routes', () => {

  let userToken;

  beforeAll(async () => {
    await db.connect();
    await db.mongoose.connection.db.dropDatabase();

    /* Creo un usuario para usar en los tests */
    await request(app)
      .post('/api/auth/register')
      .send({
        username: TEST_USERNAME,
        password: TEST_PASSWORD,
        confirmPassword: TEST_PASSWORD
      })
    
      const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: TEST_USERNAME,
        password: TEST_PASSWORD
      })

      userToken = res.body.token
  })

  afterAll(async () => {
    await db.mongoose.connection.db.dropDatabase();
    await db.disconnect();
  })

  it('Should create new portfolio', async () => {
    const res = request(app)
      .post('/api/portfolio/create')
      .set('token', userToken)
      .send()
    
    
  })
  
})