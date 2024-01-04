const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const User = require('../src/models/userModel');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication API', () => {
  beforeEach(async () => {
    // Clear the User collection before each test
    await User.deleteMany({});
  });

  describe('POST /api/auth/signup', () => {
    it('should create a new user account', async () => {
      const newUser = {
        email: 'test@example.com',
        password: 'testpassword',
      };

      const res = await chai.request(app).post('/api/auth/signup').send(newUser);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('userId');
      expect(res.body).to.have.property('email').to.equal(newUser.email);
    });

    it('should not allow signup with an existing email', async () => {
      const existingUser = {
        email: 'existing@example.com',
        password: 'existingpassword',
      };

      await chai.request(app).post('/api/auth/signup').send(existingUser);

      const res = await chai.request(app).post('/api/auth/signup').send(existingUser);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error').to.equal('Email is already registered');
    });

    it('should not allow signup with invalid data', async () => {
      const invalidUser = {
        // Missing required password field
        email: 'invalid@example.com',
      };

      const res = await chai.request(app).post('/api/auth/signup').send(invalidUser);

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should log in to an existing user account and receive an access token', async () => {
      const existingUser = {
        email: 'existing@example.com',
        password: 'existingpassword',
      };

      await chai.request(app).post('/api/auth/signup').send(existingUser);

      const res = await chai.request(app).post('/api/auth/login').send(existingUser);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('token');
      expect(res.body).to.have.property('userId');
      expect(res.body).to.have.property('email').to.equal(existingUser.email);
    });

    it('should not allow login with incorrect password', async () => {
      const existingUser = {
        email: 'existing@example.com',
        password: 'existingpassword',
      };

      await chai.request(app).post('/api/auth/signup').send(existingUser);

      const invalidCredentials = {
        email: 'existing@example.com',
        password: 'incorrectpassword',
      };

      const res = await chai.request(app).post('/api/auth/login').send(invalidCredentials);

      expect(res).to.have.status(401);
      expect(res.body).to.have.property('error').to.equal('Invalid email or password');
    });

    it('should not allow login with an invalid email', async () => {
      const invalidCredentials = {
        // Non-existing email
        email: 'nonexisting@example.com',
        password: 'invalidpassword',
      };

      const res = await chai.request(app).post('/api/auth/login').send(invalidCredentials);

      expect(res).to.have.status(401);
      expect(res.body).to.have.property('error').to.equal('Invalid email or password');
    });

    it('should not allow login with missing credentials', async () => {
      const res = await chai.request(app).post('/api/auth/login').send({});

      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error');
    });
  });
});
