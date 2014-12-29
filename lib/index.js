var _       = require('lodash')
  , Promise = require('bluebird')


var Skeleton = function(scope, manifest) {

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

  var create = function() {

    return new Promise(function(resolve, reject) {

      var action, promise

      _.forEach(manifest.scaffold, function(config, path) {

        switch(config.action) {
          case 'folder'  : action = require('./action/folder');   break;
          case 'template': action = require('./action/template'); break;
          case 'copy'    : action = require('./action/copy');     break;

          default:
            reject(new Error('Action `' + config.action + '` is not recognized'));
        }

        // It isn't needed
        delete config.action;

        promise = action(scope, scope.targetPath + path, config)
        resolve(promise);
      });

    });

  }

  return  {
    create: create
  };

};

module.exports = Skeleton;
