'use strict';

const superagent = require('superagent');
const mongoose = require('mongoose');
const app = require('../../../src/app.js');

describe('Authentication Server', () => {

  const PORT = 8888;
  beforeAll( () => {
    mongoose.connect('mongodb://localhost:27017/baseball');
    app.start(PORT);
  });
  afterAll( () => {
    app.stop();
    mongoose.connection.close();
  });
  
  it('gets a 401 on a bad login', () => {
    return superagent.get('http://localhost:8888/signin')
      .then(response => {
      })
      .catch(response => {
        expect(response.status).toEqual(401);
      });
  });

  it('gets a 401 on a bad login', () => {
    return superagent.get('http://localhost:8888/signin')
      .auth('foo','bar')
      .then(response => {
      })
      .catch(response => {
        expect(response.status).toEqual(401);
      });
  });

  it('gets a 200 on a good login', () => {
    return superagent.get('http://localhost:8888/signin')
      .auth('john','foobar')
      .then(response => {
        expect(response.statusCode).toEqual(200);
      })
      .catch(console.err);
  });

});