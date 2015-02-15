var path    = require('path')
  , fs      = require('fs-extra')
  , folder  = require('./folder')
  , _       = require('lodash')
  , Promise = require('bluebird')



/**
 * Copy a file o folder.
 *
 * @param {object} scope
 * @param {string} destination
 * @param {object} config
 *
 * @return {Promise}
 */
var copy = module.exports = function(scope, destination, config) {

  return new Promise(function(resolve, reject) {

    if(_.isUndefined(config)) {
      reject(new Error('You must pass config object'))
    }

    if(_.isUndefined(config.path)) {
      reject(new Error('You must define `path` property for `' + destination + '`'))
    }

    fs.copy(path.join(scope.rootPath, config.path), destination, function(err) {

      if(err) { return reject(new Error(err)) }

      resolve();

    });

  });

};
