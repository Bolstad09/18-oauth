'use strict';

import express from 'express';

const authRouter = express.Router();

import User from './model.js';
import auth from './middleware.js';
import oauth from './lib/oauth.js';

authRouter.post('/signup', (req, res, next) => {
  if(!Object.keys(req.body).length) {
    next(400);
  }
  let user = new User(req.body);
  user.save()
    .then(user => {
      res.send(user.generateToken());
    })
    .catch(next);
});

authRouter.get('/login',auth, (req, res, next) => {
  res.cookie('auth', req.token);
  res.send(req.token);
});

authRouter.get('/oauth', (req, res, next) => {
  oauth.authorize(req)
    .then(token => {
      res.cookie('auth', token);
      res.redirect(`${process.env.CLIENT_URL}`);
    })
    .catch(next);
});

authRouter.get('/showMeTheMoney', auth, (req,res) => {
  User.findOne(req.id)
    .then(data => {
      res.send(data);
    });
});

export default authRouter;