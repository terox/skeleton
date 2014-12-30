var  fs      = require('fs-extra')
  , chai     = require('chai')
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

    it('should create manifest', function(done) {

      var sk = new Skeleton(scope, manifest);

      sk.create()
        .then(function() {
          (scope.targetPath + 'app/').should.be.a.directory().not.empty;
          (scope.targetPath + 'app/unnamed').should.be.a.directory().empty;
          done();
        })
        .catch(function(err) {
          done(err);
        })
      ;

    });

  });

  describe('Overriding defaults', function() {

    it('should override data', function(done) {

      var sk = new Skeleton(scope, manifest, { name: 'license' });

      sk.create()
        .then(function() {
          (scope.targetPath + 'app/README.md').should.have.content('hello world!\n', 'Template failed');
          (scope.targetPath + 'app/LICENSE.md').should.have.content('license\n', 'Template failed');
          (scope.targetPath + 'app/license').should.be.a.directory().empty;
          done();
        })
        .catch(function(err) {
          done(err);
        })
      ;

    })

  });

});
