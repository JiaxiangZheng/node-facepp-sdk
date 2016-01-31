'use strict';
var FacePP = require('./apis');

var facePP = new FacePP({
  SERVER_URL: 'http://apicn.faceplusplus.com',
  API_KEY: 'YOUR_API_KEY',
  API_SECRET: 'YOUR_API_SECRET'
});

facePP.detection.detect({
  url: 'http://img.sucai.redocn.com/attachments/images/201204/20120417/Redocn_2012041310435227.jpg',
  attribute: 'glass,pose,landmark,gender,age,race,smiling'
}).then(function (body) {
  console.log(body);
}, console.log);