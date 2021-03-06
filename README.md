![cf](http://i.imgur.com/7v5ASc8.png) OAuth
===
[![Build Status](https://travis-ci.com/Bolstad09/18-oauth.svg?branch=master)](https://travis-ci.com/Bolstad09/18-oauth)

## Links
  * Travis: https://travis-ci.com/Bolstad09/18-oauth.svg?branch=master
  * PR: https://github.com/Bolstad09/18-oauth/pull/1
  
## Credit 
* Used demo code to start

## Requirements  

#### backend
* create an app on the google dev console
 * configure oauth credentials to support a client app on `http://localhost`
 * configure oauth credentials to support a server redirect uri to `http://localhost:3000/oauth/google/code`
* create a backend route in your auth server: `GET /oauth/google/code` for handling google oauth 

#### frontend 
* create an index.html with an anchor tag pointing to the google authorization page 
* configure the query string with correct key value pairs

#### Documentation  
Write a description of the project in your README.md, including detailed instructions for how to build your app. In your frontend README.md add a code block with your frontend .env vars, and in your backend README.md add a code block with your backend .env vars. 
