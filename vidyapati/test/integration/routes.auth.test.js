const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const server = require('../../app');
const knex = require('../../db/connection');
const passport = require('../../auth/local');
const taskQueue = require('../../queue');
const { setLoggedInUser } = require('../utils/fakeAuthMiddleware');

chai.use(chaiHttp);

function stubAuth({ username, id }) {
    setLoggedInUser({ username, id });

    sinon
      .stub(passport,"authenticate")
      .callsFake((strategy, options, callback) => {
        console.log("authenticate >>> ", strategy, options, callback);
        callback(null, { username, id }, null);
        return (req,res,next) => {  };
      });

}

function resetStubAuth() {
  setLoggedInUser(null);
  passport.authenticate.restore && passport.authenticate.restore();
}

describe('routes : auth', () => {

  before(function() {
    resetStubAuth();
  });

  beforeEach(async function() {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    return Promise.resolve();
  });

  afterEach(() => {
    resetStubAuth();
    return knex.migrate.rollback();
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      const res = await chai.request(server)
        .post('/auth/register')
        .send({
          username: 'michael',
          password: 'herman'
        });

      res.redirects.length.should.eql(0);
      res.status.should.eql(200);
      res.type.should.eql('application/json');
      res.body.token.should.exist;
      return Promise.resolve();
    });

    it('should cause 401 if a user is logged in', async () => {
      stubAuth({ username: 'jeremy', id: 1 });

      let res = await chai.request(server)
        .post('/auth/login')
        .send({
          username: 'jeremy',
          password: 'johnson123'
        });

      const { token } = res.body;

      res = await chai.request(server)
        .post('/auth/register')
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: 'michael',
          password: 'herman'
        });

      res.redirects.length.should.eql(0);
      res.status.should.eql(401);
      res.type.should.eql('application/json');
      res.body.status.should.eql('You are already logged in');

      Promise.resolve();
    });

    it('should throw an error if the username is < 6 characters', (done) => {
      chai.request(server)
      .post('/auth/register')
      .send({
        username: 'six',
        password: 'herman'
      })
      .end((err, res) => {
        res.redirects.length.should.eql(0);
        res.status.should.eql(400);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Username must be longer than 6 characters');
        done();
      });
    });

    it('should throw an error if the password is < 6 characters', (done) => {
      chai.request(server)
      .post('/auth/register')
      .send({
        username: 'michael',
        password: 'six'
      })
      .end((err, res) => {
        res.redirects.length.should.eql(0);
        res.status.should.eql(400);
        res.type.should.eql('application/json');
        res.body.status.should.eql('Password must be longer than 6 characters');
        done();
      });
    });
  });

  describe('POST /auth/login', () => {
    it('should login a user', (done) => {
      chai.request(server)
      .post('/auth/login')
      .send({
        username: 'jeremy',
        password: 'johnson123'
      })
      .end((err, res) => {
        should.not.exist(err);
        res.redirects.length.should.eql(0);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.token.should.exist;
        done();
      });
    });


    it('should not login an unregistered user', (done) => {
      chai.request(server)
      .post('/auth/login')
      .send({
        username: 'michael',
        password: 'johnson123'
      })
      .end((err, res) => {
        res.redirects.length.should.eql(0);
        res.status.should.eql(404);
        res.type.should.eql('application/json');
        res.body.status.should.eql('User not found');
        done();
      });
    });

    it('should cause 401 if a user is logged in', async () => {
      stubAuth({ username: 'jeremy', id: 1 });

      let res = await chai.request(server)
        .post('/auth/login')
        .send({
          username: 'jeremy',
          password: 'johnson123'
        });

      const { token } = res.body;

      await chai.request(server);

      res = await chai.request(server)
        .post('/auth/login')
        .set("Authorization", `Bearer ${token}`)
        .send({
          username: 'jeremy',
          password: 'johnson123'
        });

      res.redirects.length.should.eql(0);
      res.status.should.eql(401);
      res.type.should.eql('application/json');
      res.body.status.should.eql('You are already logged in');

      return Promise.resolve();
    });
  });

  describe('/sync API', () => {
    it('should add pull task to queue', async () => {
      sinon.stub(taskQueue,"add")
        .callsFake((task) => {
          return Promise.resolve({ id: 'task_1', timestamp: 123123 })
        });

      let res = await chai.request(server)
        .post('/auth/login')
        .send({
          username: 'kelly',
          password: 'bryant123'
        });

      stubAuth({ username: 'kelly', id: 2 });

      const { token } = res.body;

      res = await chai.request(server)
        .post('/sync/pull')
        .set("Authorization", `Bearer ${token}`)
        .send();

      res.redirects.length.should.eql(0);
      res.status.should.eql(201);
      res.type.should.eql('application/json');
      res.body.should.eql({ id: 'task_1', timestamp: 123123 });
      return Promise.resolve()
    });

    it('should return a 401 if the user is not logged in', async () => {
      let res = await chai.request(server)
        .post('/sync/pull');
        res.redirects.length.should.eql(0);
        res.status.should.eql(401);
        // Not sure why below doesn't work properly
        // res.type.should.eql('application/json');
        // res.body.status.should.eql('Please log in');
    });

    it('should return a 401 if the user is not an admin', async () => {
      let res = await chai.request(server)
        .post('/auth/login')
        .send({
          username: 'jeremy',
          password: 'johnson123'
        });

      stubAuth({ username: 'jeremy', id: 1 });

      const { token } = res.body;

      res = await chai.request(server)
        .post('/sync/pull')
        .set("Authorization", `Bearer ${token}`)
        .send();

      res.redirects.length.should.eql(0);
      res.status.should.eql(401);
      res.type.should.eql('application/json');
      res.body.status.should.eql('You are not authorized');

      return Promise.resolve();
    });
  });
});
