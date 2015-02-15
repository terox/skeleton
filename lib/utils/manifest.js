var _ = require('lodash');



/**
 * Validate manifest.
 *
 * Validate that manifest has correct params.
 *
 * @param {Object} manifest Manifest file
 *
 * @returns {Object}
 */
var validate = exports.validate = function( manifest ) {

  if(_.isUndefined(manifest.scaffold)) {
    throw new Error('Manifest must have a valid `scaffold` property')
  }

  return manifest;
};