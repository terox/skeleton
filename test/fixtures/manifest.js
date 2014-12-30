module.exports = {

  defaultData: {
    name: 'unnamed'
  },

  scaffold: {
    'app/components' : { action: 'folder',   mode: 0777 },
    'app/README.md'  : { action: 'template', path: 'templates/README.tpl', data: { name: 'hello world!'} },
    'app/LICENSE.md' : { action: 'template', path: 'templates/LICENSE.tpl', data: { name: 'license' } },
    'app/assets/'    : { action: 'copy',     path: 'assets/subdir' },
    'app/<%= name %>': { action: 'folder',   mode: 0777 }
  }

};
