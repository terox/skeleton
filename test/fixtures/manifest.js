module.exports = {

  scaffold: {
    'app/components' : { action: 'folder',   mode: 0777 },
    'app/README.md'  : { action: 'template', path: 'templates/README.tpl', payload: { name: 'hello world!'} },
    'app/assets/'    : { action: 'copy',     path: 'assets/subdir' },
  }

};
