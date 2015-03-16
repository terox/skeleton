# Fast Skeleton
[![NPM Package Version](https://img.shields.io/npm/v/fskeleton.svg?style=flat)](https://www.npmjs.com/package/fskeleton)
[![Downloads](https://img.shields.io/npm/dm/fskeleton.svg?style=flat)](https://www.npmjs.com/package/fskeleton)
[![Build Status](https://travis-ci.org/terox/skeleton.svg)](https://travis-ci.org/terox/skeleton)
[![Code Climate](https://codeclimate.com/github/terox/skeleton/badges/gpa.svg)](https://codeclimate.com/github/terox/skeleton)
[![Inline docs](http://inch-ci.org/github/terox/skeleton.svg?branch=master)](http://inch-ci.org/github/terox/skeleton)
[![Gratipay](http://img.shields.io/gratipay/terox.svg)](https://gratipay.com/terox/)

>Easy and fast library for generate file and folder structures in your
>projects with a very small effort.

***Features***:
* Small footprint library.
* You can use interfaces like a prompt with [skeleton-prompt](https://github.com/terox/skeleton-prompt).

## Getting Started

Skeleton works with ***generators***. A generator are a directory with files, 
folders and templates that will be created in some location of your file system.

The main file of generator is known as "manifest". Manifest defines all actions 
that will be done. For example: create, copy o generate files from predefined 
templates. In this directory we have files and folder structure that contains 
the templates or files that we will work with it.

Skeleton is a very simplified concept of [yeoman](https://github.com/yeoman/yo) 
generators. I try to avoid the complexity of this project to put in your hands
a very useful library.

### Installation

```
npm install fskeleton --save
```

### Creating a *generator*

Only create a directory and put inside it a file called **manifest.js**:
```
/home/me/fskeleton/sk/
└── manifest.js
```
> ***Note***: you can name this file with other name, but you need to remember
> it when you instantiate the generator.

You are free to define the internal folder and file structure, like where locate
templates, assets and other types of files. My recommendation is follow some
methodology. You can study and follow our test [fixtures](https://github.com/terox/skeleton/tree/master/test/fixtures).
For example:
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

### Creating the *manifest.js* file

First of all, create a ```manifest.js```. This file tells Skeleton how deal with
files inside generator. The ***scaffold property must be defined***.

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

There are two ways for deploy structures:

#### Traditional way:

You define all scope object at instantiation time.

```javascript
var Skeleton = require('fskeleton');

// Optional argument and object. It will create a data object for each path in
// scaffold object. Take care! if some data object is defined, it will be merged
var data = {
  components: ['component1', 'component2']
};

var sk = new Skeleton({
  generator : '/home/me/fskeleton/sk',  // Where is the generator
  dest      : '/tmp/',                  // Where will be created the structure
}, data);

// Create structure in file system
sk.create()
  .then(function() {
    // Do things when finish...
  })
;  
```

#### Shortcut way:

You can use this way for [skeleton-prompt](https://github.com/terox/skeleton-prompt)
and ask scope variables like ```dest``` or for complete ```data``` object.

```javascript
var Skeleton = require('fskeleton');

var data = {
  components: ['component1', 'component2']
};

// You can use '/home/me/fskeleton/sk/othermanifes.js', by default it search
// manifest.js
var sk = new Skeleton('/home/me/fskeleton/sk', data);

sk.scope('dest', '/tmp/');

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
