/*!
 * node-facepp-sdk - lib/apis.js
 * Copyright(c) 2016 Jiaxiang Zheng <jiaxiang.zheng135@gmail.com>
 * MIT Licensed
 */

'use strict';

let request = require('request');
let querystring = require('querystring');

const api_tree = {
  detection: {
    detect: '',
    landmark: '',
  },
  train: {
    verify: '',
    search: '',
    identity: ''
  },
  recognition: {
    compare: '',
    verify: '',
    search: '',
    identify: ''
  },
  grouping: {
    grouping: ''
  },
  person: {
    delete: '',
    add_face: '',
    remove_face: '',
    set_info: '',
    get_info: ''
  },
  faceset: {
    create: '',
    delete: '',
    add_face: '',
    remove_face: '',
    set_info: '',
    get_info: ''
  },
  group: {
    create: '',
    delete: '',
    add_person: '',
    remove_person: '',
    get_info: '',
  },
  info: {
    get_image: '',
    get_face: '',
    get_person_list: '',
    get_faceset_list: '',
    get_group_list: '',
    get_session: '',
    get_app: ''
  }
}

class FacePP {
  constructor(config) {
    this.SERVER_URL = config.SERVER_URL;
    this.API_KEY = config.API_KEY;
    this.API_SECRET = config.API_SECRET;

    this.init();
  }

  init() {
    this._flatten(api_tree, this, []);
  }

  _flatten(obj, res, level_arr) {
    for (let key in obj) {
      if (typeof obj[key] === 'string' || !obj[key]) {
        res[key] = this._get_api('/' + level_arr.concat([key]).join('/'));
      } else {
        res[key] = this._flatten(obj[key], {}, level_arr.concat([key]));
      }
    }
    return res;
  }

  _get_api(url) {
    return (options) => {
      return new Promise((resolve, reject) => {
        let queryString = querystring.stringify(Object.assign({
          api_secret: this.API_SECRET,
          api_key: this.API_KEY,
        }, options));
        request({
          baseUrl: this.SERVER_URL,
          method: 'GET',
          url: url + '?' + queryString
        }, (err, response, body) => {
          if (err) {
            reject(err);
            return;
          }
          let statusCode = response.statusCode;

          if (typeof body === 'string') {
            body = JSON.parse(body);
          }
          if (statusCode !== 200) {
            reject(new Error(body.error));
            return;
          }
          resolve(body);
        });
      });
    }
  }
}

module.exports = FacePP;
