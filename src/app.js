/*!
 * node-facepp-sdk - lib/app.js
 * Copyright(c) 2016 Jiaxiang Zheng <jiaxiang.zheng135@gmail.com>
 * MIT Licensed
 */

'use strict';

let FacePP = require('./apis');

let conf = require('../conf');

var facePP = new FacePP({
  SERVER_URL: conf.API_URL,
  API_KEY: conf.API_KEY,
  API_SECRET: conf.API_SECRET
});

facePP.detection.detect({
	url: 'http://s10.mogucdn.com/p1/160130/160_ie3tsytcmnrgkobwgyzdambqgayde_960x402.jpg',
	attribute: 'glass,pose,landmark,gender,age,race,smiling'
}).then((result) => {
  let faces = result.face;

  return Promise.all(faces.map((face) => {
    return Promise.resolve(face.face_id);
  }));
}).then((face_ids) => {
  return Promise.all(face_ids.map((id) => {
    return facePP.detection.landmark({
      face_id: id
    })
  }))
}).then((face_landmarks) => {
  face_landmarks.map((landmark) => {
    console.log(landmark.result);
  });
})
.catch(console.error);
