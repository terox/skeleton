var path = require('path');



/**
 * Manifest path
 *
 * @param {String} gpath       Generator path
 * @param {String} defaultFile Default file
 */
var manifestPath = exports.manifestPath = function (gpath, defaultFile) {

  if('.js' === path.extname(gpath)) {
    return gpath;
  }

  return path.join(gpath, defaultFile);
};