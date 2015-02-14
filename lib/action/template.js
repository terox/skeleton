var fs      = require('fs-extra')
  , path    = require('path')
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
module.exports = function(scope, destination, config) {

  return new Promise(function(resolve, reject) {

    if(_.isUndefined(config)) {
      reject(new Error('You must pass config object'))
    }

    if(_.isUndefined(config.path)) {
      reject(new Error('You must define `path` property for `' + destination + '`'))
    }

    // Create recursive dirs
    fs.mkdirs(path.dirname(destination), function(err) {

      if(err) {
        return reject(new Error(err))
      }

      // Read template file from generator
      fs.readFile(path.join(scope.rootPath, config.path), function(err, rawData) {

        if(err) { return reject(err); }

        var finalData = _.template(rawData, config.data);

        // Write final data in destination
        fs.writeFile(destination, finalData, function(err) {

          if(err) { return reject(new Error(err)); }

          resolve();
        });

      });

    });

  });

};
