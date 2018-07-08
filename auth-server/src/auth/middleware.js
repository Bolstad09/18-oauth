'use strict';

import User from './model.js';

export default (req, res, next) => {

  let authorize = (token) => {
    User.authorize(token)
      .then(user => {
        if(!user) { getAuth(); }
        else {
          req.token=token;
          next();
        }
      })
      .catch(next);
  };

  let authenticate = (auth) => {
    User.authenticate(auth)
      .then(user => {
        if (!user) { getAuth(); }
        else {
          req.token = user.generateToken();
          next();
        }
      })
      .catch(next);

  };

  let getAuth = () => {
    return next('401'); 
  };

  try {
    if(req.cookies.auth) {
      return authorize(req.cookies.auth);
    }
    let userObj = {};
    let authHeader = req.headers.authorization;
    if(!authHeader) {
      return getAuth();
    }

    if(authHeader.match(/basic/i)) {
      let base64Header = authHeader.replace(/Basic\s+/i, ''); 
      let base64Buffer = Buffer.from(base64Header,'base64');
      let bufferString = base64Buffer.toString();
      let [username,password] = bufferString.split(':');
      userObj = {username,password};
      authenticate(userObj);
    }
    if(authHeader.match(/bearer/i)) {
      let token = authHeader.replace(/bearer\s+/i, '');
      authorize(token);
    }
  } catch(error) {
    next(error);
  }

};