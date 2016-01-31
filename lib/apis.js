'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var request = require('request');
var querystring = require('querystring');

var api_tree = {
  detection: {
    detect: '',
    landmark: '' },
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
    'delete': '',
    add_face: '',
    remove_face: '',
    set_info: '',
    get_info: ''
  },
  faceset: {
    'create': '',
    'delete': '',
    add_face: '',
    remove_face: '',
    set_info: '',
    get_info: ''
  },
  group: {
    create: '',
    'delete': '',
    add_person: '',
    remove_person: '',
    get_info: '' },
  info: {
    get_image: '',
    get_face: '',
    get_person_list: '',
    get_faceset_list: '',
    get_group_list: '',
    get_session: '',
    get_app: ''
  }
};

var FacePP = (function () {
  function FacePP(config) {
    _classCallCheck(this, FacePP);

    this.SERVER_URL = config.SERVER_URL;
    this.API_KEY = config.API_KEY;
    this.API_SECRET = config.API_SECRET;

    this.init();
  }

  _createClass(FacePP, [{
    key: 'init',
    value: function init() {
      this._flatten(api_tree, this, []);
    }
  }, {
    key: '_flatten',
    value: function _flatten(obj, res, level_arr) {
      for (var key in obj) {
        if (typeof obj[key] === 'string' || !obj[key]) {
          res[key] = this._get_api('/' + level_arr.concat([key]).join('/'));
        } else {
          res[key] = this._flatten(obj[key], {}, level_arr.concat([key]));
        }
      }
      return res;
    }
  }, {
    key: '_get_api',
    value: function _get_api(url) {
      var _this = this;

      return function (options) {
        return new Promise(function (resolve, reject) {
          var queryString = querystring.stringify(Object.assign({
            api_secret: _this.API_SECRET,
            api_key: _this.API_KEY }, options));
          request({
            baseUrl: _this.SERVER_URL,
            method: 'GET',
            url: url + '?' + queryString
          }, function (err, response, body) {
            if (err) {
              reject(err);
              return;
            }
            var statusCode = response.statusCode;

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
      };
    }
  }]);

  return FacePP;
})();

module.exports = FacePP;