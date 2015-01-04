module.exports = {

  defaultData: {
    name: 'unnamed'
  },

  before: function(scope, data) {

    var self = this;

    if(typeof data.components !== "undefined") {

      data.components.forEach(function(component) {

        self.scaffold['app/components/' + component + '.txt'] = {
          action : 'template',
          path   : 'templates/component.tpl',
          data   : { component: component}
        };

      });

    }
  },

  scaffold: {
    'app/components' : { action: 'folder',   mode: 0777 },
    'app/README.md'  : { action: 'template', path: 'templates/README.tpl', data: { name: 'hello world!'} },
    'app/LICENSE.md' : { action: 'template', path: 'templates/LICENSE.tpl'},
    'app/assets/'    : { action: 'copy',     path: 'assets/subdir' },
    'app/<%= name %>': { action: 'folder',   mode: 0777 }
  }

};
