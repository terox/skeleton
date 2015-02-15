var path = require('path')
  , Promise = require('bluebird')
  , fs   = require('fs-extra')



/**
 * Create a folder
 *
 * @param {object} scope
 * @param {string} path
 * @param {object} config
 *
 * @return {Promise}
 */
var folder = module.exports = function(scope, path, config) {

  return new Promise(function(resolve, reject) {

    var mode  = '0777'
    , umask = 0000

    if('undefined' !== typeof(config)) {
      mode  = config.mode  || mode
      umask = config.umask || umask
    }

    // Set maks
    process.umask(umask)

    // And then, create dirs
    fs.mkdirs(path, { mode: mode }, function(err) {

      if(err) {
        return reject(new Error(err));
      }

      resolve();
    });

  });

};
