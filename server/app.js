require('newrelic');
const path = require('path');
const express = require('express');
//const redis = require('redis');
//const REDIS_PORT = process.env.REDIS_PORT;
//const client = redis.createClient(REDIS_PORT);

const request =require('request');
const app = express();
app.use(express.static(path.join(__dirname, '/../public/')));
app.use('/:restaurant_id', express.static(path.join(__dirname, '/../public/')));

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const gallery = 'http:/13.57.41.164:3001',
    reservations = 'http://54.200.32.135',
    menus = 'http://18.219.221.244',
    reviews = 'http://18.223.115.5';

    const kat = 'http://18.223.132.108:3005/booking/1/'

    // function cache(req, res, next) {
    //   const param = req.params.restaurant_id;
    //   client.get(param, function (err, data) {
    //       if (err) throw err;
    //       if (data != null) {
    //       let daga =JSON.parse(data)
    //           res.send(daga);
    //       } else {
    //           next();
    //       }
    //   });
    // }
console.log('im on')
app.get("/:restaurant_id/images", function(req, res) {
  console.log('serever')
  request(`${gallery}/${req.params.restaurant_id}/images`, (error, response, body) => {
    if (error){
      console.log(error)
    }else{
      //client.set(req.params.restaurant_id, JSON.stringify(body));
      res.status(200).send(result.rows);
      
    }

  
});
    // console.log('redirecting to photo gallery server');
    // apiProxy.web(req, res, {target: gall}, (err,result) => {
    //   console.log('dd')
    // });
    
});

app.all("/:restaurant_id/reservations", function(req, res) {
  //console.log('redirecting to reservations');
  apiProxy.web(req, res, {target: reservations});
});

app.all("/:restaurant_id/reservations/*", function(req, res) {
   // console.log('redirecting to reservations');
    apiProxy.web(req, res, {target: reservations});
});

app.get("/:restaurant_id/menus", function(req, res) {
    //console.log('redirecting to menus');
    apiProxy.web(req, res, {target: menus});
});

app.all("/:restaurantID/reviews", function(req, res) {
  //console.log('redirecting to reviews');
  apiProxy.web(req, res, {target: reviews});
});

//app.listen('54.183.190.233');
app.listen(3000);

module.exports = app;