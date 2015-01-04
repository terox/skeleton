var _       = require('lodash')
  , Promise = require('bluebird')


/**
 * Skeleton
 *
 * @param {Object} scope    Environment
 * @param {Object} manifest Structure of folder and files manifest
 * @param {Object} data     Default data overrides
 *
 * @return void
 */
var Skeleton = function(scope, manifest, data) {

  var merge

  if(_.isUndefined(scope)) {
    throw new Error('You must specify a scope with `rootPath` and `targetPath` properties')
  }

  if(_.isUndefined(scope.rootPath)) {
    throw new Error('Scope must have a `rootPath` property')
  }

  if(_.isUndefined(scope.targetPath)) {
    throw new Error('Scope must have a `targetPath` property')
  }

  if(_.isUndefined(manifest.scaffold)) {
    throw new Error('Manifest must have a valid `scaffold` property')
  }
  
  manifest = _.cloneDeep(manifest);
  merge    = _.merge(manifest.defaultData, data);

  this.scope    = scope;
  this.manifest = manifest;
  this.data     = _.isUndefined(merge) ? {} : merge;

};

/**
 * Get current manifest scaffold
 *
 * @return {Object}
 */
Skeleton.prototype.getScaffold = function() {
  return this.manifest.scaffold;
}

/**
 * Create scaffolding
 *
 * @return {Promise}
 */
Skeleton.prototype.create = function() {

  var self = this
    , result

  // Exec before
  if(!_.isUndefined(self.manifest.before) && _.isFunction(self.manifest.before)) {
    self.manifest.before(self.scope, self.data);
  }

  return new Promise(function(resolve, reject) {

    var action, promise

    _.forEach(self.manifest.scaffold, function(config, path) {

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

      // The config.data have max priority: overrides all preexistent data.
      config.data = _.merge(_.clone(self.data), config.data);

      // Dynamic dirname/filename
      path = _.template(path, config.data);

      // Do action
      promise = action(self.scope, self.scope.targetPath + path, config)

      // Resolve promises
      resolve(promise);
    });

  });

}

module.exports = Skeleton;
