var path     = require('path')
  , utils    = require('./utils/path')
  , validate = require('./utils/manifest').validate
  , defaults = require('./config').defaults
  , _        = require('lodash')
  , Promise  = require('bluebird');

var protectedParams = ['generator', 'rootPath']




/**
 * Skeleton.
 *
 * ### Options (object):
 *  - `generator` Path to generator. You can use custom _manifest file or default.
 *  - `dest`      Destination path. Where deploy all generated files
 *
 * ### Options (string):
 * You can use a path directly and setup dest by interfaces or progamatically.
 *
 * @param {String | Object} options  Environment variables
 * @param {Object}          data     Default data overrides
 *
 * @return {Skeleton}
 */
var Skeleton = function( options, data ) {

  var scope = {}, mergedData, manifest;

  // Shortcut: passing `generator` property directly.
  if(_.isString(options)) {
    scope.generator = options;
  } else if(_.isObject(options)) {
    scope = options;
  }

  if(_.isUndefined(scope.generator)) {
    throw new Error('You must define a `generator` property to indicate where is it')
  }

  // Setup generator paths
  scope.generator = utils.manifestPath(scope.generator, defaults.manifestFilename);
  scope.rootPath  = path.dirname(scope.generator);

  // Get and validate manifest
  manifest = validate(require(scope.generator));

  manifest   = _.cloneDeep(manifest);
  mergedData = _.merge(manifest.defaultData, data);

  this._scope    = scope;
  this._data     = _.isUndefined(mergedData) ? {} : mergedData;
  this._manifest = manifest;

};

/**
 * Getter/Setter scope object
 *
 * @param {String}          param Scope object param name
 * @param {Object | String} value Value
 *
 * @returns {Skeleton | *}
 */
Skeleton.prototype.scope = function( param, value ) {

  if('undefined' === typeof value) {
    return this._scope[param];
  }

  if(protectedParams.indexOf(param) >= 0) {
    throw new Error('You can not change `' + param + '` property on runtime');
  }

  this._scope[param] = value;

  return this;
};

/**
 * Getter/Setter data object
 *
 * @param {String} param Data object param name
 * @param {*}      value Value
 *
 * @returns {Skeleton | *}
 */
Skeleton.prototype.data = function( param, value ) {

  if('undefined' === typeof value) {
    return this._data[param];
  }

  this._data[param] = value;

  return this;
};

/**
 * Get current manifest scaffold
 *
 * @return {Object}
 */
Skeleton.prototype.getScaffold = function() {
  return this._manifest.scaffold;
}

/**
 * Create scaffolding
 *
 * @return {Promise}
 */
Skeleton.prototype.create = function() {

  var self = this, result;

  if('undefined' === typeof this._scope.dest) {
    throw new Error('Scope must have a `dest` property')
  }

  // Exec before
  if(!_.isUndefined(self._manifest.before) && _.isFunction(self._manifest.before)) {
    self._manifest.before(self._scope, self._data);
  }

  return new Promise(function(resolve, reject) {

    var action, promise

    _.forEach(self._manifest.scaffold, function(config, dpath) {

      switch(config.action) {

        case 'folder':
          action = require('./action/folder');
          break;

        case 'template':
          action = require('./action/template');
          break;

        case 'copy':
          action = require('./action/copy');
          break;

        default:
          reject(new Error('Action `' + config.action + '` is not recognized'));

      }

      // It isn't needed
      delete config.action;

      // The config._data have max priority: overrides all preexistent _data.
      config.data = _.merge(_.clone(self._data), config.data);

      // Dynamic dirname/filename
      dpath = _.template(dpath, config.data);

      // Do action
      promise = action(self._scope, path.join(self._scope.dest, dpath), config)

      // Resolve promises
      resolve(promise);
    });

  });

};

module.exports = Skeleton;
