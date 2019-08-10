require('newrelic');
const path = require('path');
const express = require('express');
const request = require('request');
const app = express();
app.get('/loaderio-fe0f477145e77cf99aa574fea2e8ce67/',(req,res)=>{
  res.send('loaderio-fe0f477145e77cf99aa574fea2e8ce67')
})
app.use(express.static(path.join(__dirname, '/../public/')));
app.use('/:restaurant_id', express.static(path.join(__dirname, '/../public/')));

const httpProxy = require('http-proxy');
const apiProxy = httpProxy.createProxyServer();

const gallery = 'http://13.52.61.135',

    reservations = 'http://54.200.32.135',
    menus = 'http://18.219.221.244',
    reviews = 'http://18.223.115.5',
    kat = 'http://18.223.132.108:3005/booking/1/'

console.log('im on')
app.get("/:restaurant_id/images", function(req, res) {
  
  request(`${gallery}/${req.params.restaurant_id}/images`, (error, response, body) => {
    if (error){
      console.log(error)
    }else{
      
      
      res.status(200).send(body); 
    }
  });
});
// add data 
app.post("/:restaurant_id/images", function(req, res) {  
  request.post(`${gallery}/${req.params.restaurant_id}/images`, req.body, (error, res) => {
    if (error){
      console.log(error)
    }else{
    
     
      res.status(200).send();
    }
 });
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
