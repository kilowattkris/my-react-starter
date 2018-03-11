import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import axios from 'axios';

import env from '../env';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);
const router = express.Router({
  caseSensitive: true
});

// const apiKey = process.env.API_KEY;
// const apiSecret = process.env.API_SECRET;
// const baseURL = process.env.API_BASEURL;

const apiKey = env.API_KEY;
const apiSecret = env.API_SECRET;
const baseURL = env.API_BASEURL;
const authURL = env.API_AUTHURL;

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  console.log(apiKey+':'+apiSecret);
  console.log(Buffer.from(apiKey+':'+apiSecret).toString('base64'));
  console.log(Buffer.from(Buffer.from(apiKey+':'+apiSecret).toString('base64'), 'base64').toString('ascii'));
  axios({
    baseURL: baseURL,
    url: authURL,
    method: "POST",
    headers: {
      'Authorization': Buffer.from(apiKey+':'+apiSecret).toString('base64').replace(/[^\w\s]/gi, ''),
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    data: 'grant_type=client_credentials'
    // {
    //     apiKey: apiKey,
    //     apiSecret: apiSecret
    // }
  }).then((tokenResponse) => {
      console.log(tokenResponse);
      // response.render("index", {
      //     "title": "Index",
      //     "token": tokenResponse.data,
      //     "url": baseURL
      // });
      res.sendFile(path.join( __dirname, '../src/index.html'));
  }).catch((error) => {
      console.log(error);
      if (error.response) {
          console.error(error.response.data);
      } else {
          console.error(error);
      }
  });
  // res.sendFile(path.join( __dirname, '../src/index.html'));
});
// router.route("*")
//   .get(function(request, response, next) {
//     response.sendFile(path.join( __dirname, '../src/index.html'));
//       // axios({
//       //     baseURL: baseURL,
//       //     url: authURL,
//       //     method: "POST",
//       //     headers: {
//       //       'Authorization': btoa(apiKey+':'+apiSecret),
//       //       'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
//       //     },
//       //     data: 'grant_type=client_credentials'
//       //     // {
//       //     //     apiKey: apiKey,
//       //     //     apiSecret: apiSecret
//       //     // }
//       // }).then((tokenResponse) => {
//       //     console.log(tokenResponse);
//       //     // response.render("index", {
//       //     //     "title": "Index",
//       //     //     "token": tokenResponse.data,
//       //     //     "url": baseURL
//       //     // });
//       //     response.sendFile(path.join( __dirname, '../src/index.html'));
//       // }).catch((error) => {
//       //     console.log(error);
//       //     if (error.response) {
//       //         console.error(error.response.data);
//       //     } else {
//       //         console.error(error);
//       //     }
//       //     const authError = new Error("Application Authentication Failed.");
//       //     authError.status = 401;
//       //     next(authError);
//       // });
//   }) // close get
// ;

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
