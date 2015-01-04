var  fs      = require('fs-extra')
  , chai     = require('chai')
  , should   = require('chai').should()
  , chaifs   = require('chai-fs')
  , Skeleton = require('../../lib')
  , manifest = require('../fixtures/manifest')

chai.use(chaifs)
chai.should();



describe('Skeleton', function() {

  var scope = {
    rootPath   : __dirname + '/../fixtures/',
    targetPath : './.tests/integration/'
  };

  describe('With defaults', function() {

    var sk

    before(function(done) {

      sk = new Skeleton(scope, manifest);

      sk.create()
        .then(function() {
          done();
        })
        .catch(function(err) {
          done(err);
        })
      ;

    });

    it('should create manifest with defaults', function() {
      (scope.targetPath + 'app/').should.be.a.directory().not.empty;
      (scope.targetPath + 'app/unnamed').should.be.a.directory().empty;
    });

    it('should not create dynamic scaffold in `before`', function() {
      var scaffold = sk.getScaffold();

      should.not.exist(scaffold['app/components/component1.txt']);
      should.not.exist(scaffold['app/components/component2.txt']);
    });

  });

  describe('Overriding defaults', function() {

    var sk

    before(function(done) {

      sk = new Skeleton(scope, manifest, {
          name       : 'license',
          components : ['component1', 'component2']
        });

      sk.create()
        .then(function() {
          done();
        })
        .catch(function(err) {
          done(err)
        })
      ;

    });

    it('should use data object in file config', function() {
      (scope.targetPath + 'app/README.md').should.have.content('hello world!\n', 'Template failed');
    });

    it('should use overriden data', function() {
      (scope.targetPath + 'app/LICENSE.md').should.have.content('license\n', 'Template failed');
      (scope.targetPath + 'app/license').should.be.a.directory().empty;
    });

    it('should change scaffold with `before` function', function() {
      var scaffold = sk.getScaffold();

      should.exist(scaffold['app/components/component1.txt']);
      should.exist(scaffold['app/components/component2.txt']);
    });

    it('should have dynamic files generated by `before`', function() {
      (scope.targetPath + 'app/components/component1.txt').should.have.content('Component: component1\n', 'Template failed');
      (scope.targetPath + 'app/components/component2.txt').should.have.content('Component: component2\n', 'Template failed');
    });

  });

});
