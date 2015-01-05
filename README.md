# Fast Skeleton
[![NPM Package Version](https://img.shields.io/npm/v/fskeleton.svg?style=flat)]()
[![Downloads](https://img.shields.io/npm/dm/fskeleton.svg?style=flat)]()
[![Build Status](https://travis-ci.org/terox/skeleton.svg)](https://travis-ci.org/terox/skeleton)

> Easy and fast library for generate file and folder structure in your
> projects with a very small effort.

## Installation

```
npm install fskeleton --save
```

## Getting Started

Skeleton has a main file known as "manifest" inside a directory. Manifest
defines all actions that will be done. For example: create, copy o generate
files from predefined templates. In this directory we have files and folder structure that contains the templates or files that we will work with it.

All set of files and folders we know it as **generator**. It is a very simplified
concept of [yeoman](https://github.com/yeoman/yo) generators, if it can help you.

### Creating a *generator*

Only create a directory and put inside it a file called **manifest.js**:
```
/home/me/fskeleton/sk/
└── manifest.js
```
You are free to define the internal folder and file structure, like where locate
templates, assets and other types of files. My recommendation is follow some
methodology. You can study and follow or test [fixtures](https://github.com/terox/skeleton/tree/master/test/fixtures). For
example:
```
/home/me/fskeleton/sk/
├── manifest.js
├── templates
|    ├── README.tpl
|    └── component.tpl
└── assets
     ├── asset1.jpg
     ├── asset2.jpg
     └── subdir
         ├── asset3.txt
         └── asset4.jpg
```


### Creating the *manifest* file

First of all, create a manifest:
```javascript
// /home/me/fkeleton/sk/manifest.js
module.exports = {

  // Default data for all scaffold
  defaultData: {
    name: 'unnmaed'
  },

  scaffold: {
    // Creates a folder with rwx permissions (UNIX)
    'app/components' : {
      action : 'folder',
      mode   : 0777
    },
    // Generate a file from template
    'app/README.md': {
       action : 'template',
       path   : 'templates/README.tpl',
       // Data for template: name will be overriden
       data   : { name: 'Testing' }
    },
    // Copy "as it is" the assets/ to app/assets. Including subdirs.
    'app/assets/': {
      action : 'copy',
      path   : 'assets/'
    }
  }

}
```
### Using *before* trigger

You can add to your manifest a ```before``` function to change scaffold object
dynamically. For example:

```javascript
module.exports = {

  // ......

  // If we pass data argument with components property, we will add
  // dynamically new path and configurations to scaffold object
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

  }

  // ......
}


```

### Use

Now you can create the skeleton:
```javascript
var Skeleton = require('fskeleton');
var manifest = require('./sk/manifest.js')

// Optional argument and object. It will create a data object for each path in
// scaffold object. Take care! if some data object is defined, it will be merged
var data = {
  components: ['component1', 'component2']
};

var sk = new Skeleton({
  rootPath   : '/home/me/fskeleton/sk',  // Where is the generator
  targetPath : '/tmp/',                  // Where will be created the structure
}, manifest, data);

// Create structure in file system
sk.create()
  .then(function() {
    // Do things when finish...
  })
;  
```
Remember that ```sk.create()``` returns a promise object. I use [bluebird](https://github.com/petkaantonov/bluebird) library.

## License

[MIT License](https://github.com/terox/skeleton/blob/master/LICENSE)
© [David Pérez Terol](http://www.github.com/terox)
