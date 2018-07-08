'use strict';

import superagent from 'superagent';

import User from '../users.js';


const authorize = (req) => {

  let code = req.query.code;

  console.log('(1) code', code);

  // exchange the code or a token
  return superagent.post('https://www.linkedin.com/oauth/v2/accessToken')
    .type('form')
    .send({
      code: code,
      client_id: process.env.LINKEDIN_CLIENT_ID,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      redirect_uri: `${process.env.API_URL}/oauth`,
      grant_type: 'authorization_code',
    })
    .then(response => {
      let linkedInToken = response.body.access_token;
      console.log('2. linkedin token is: ', linkedInToken);
      return superagent.get('https://api.linkedin.com/v1/people/~:(formatted-name,first-name,last-name,email-address,picture-url)')
        .set('Authorization', `Bearer ${linkedInToken}`)
        .then(response => {
          let linkedInUser = {
            name: response.text.split('<formatted-name>')[1].split('<')[0],
            email: response.text.split('<email-address>')[1].split('<')[0],
            pictre: response.text.split('<picture-url>')[1].split('<')[0],
          };
          console.log('3. linkedInUser User', linkedInUser);
          return linkedInUser;
        });
    })
    .then(token => {
      console.log('4. creating user model');
      return User.createFromOAuth(token);
    })
    .then(newUser => {
      console.log('5. user model created, making token');
      return newUser.generateToken();
    });
};

export default { authorize };