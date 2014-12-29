var  fs      = require('fs-extra')
  , chai     = require('chai')
  , chaifs   = require('chai-fs')
  , Skeleton = require('../../lib')
  , manifest = require('../fixtures/manifest')

chai.use(chaifs)
chai.should();



describe('Skeleton', function() {

  var sk

  var scope = {
    rootPath   : __dirname + '/../fixtures/',
    targetPath : './.tests/integration/'
  };

  before(function() {

    sk = new Skeleton(scope, manifest);
    /*fs.remove(scope.targetPath, function(err) {

      if(err) {
        done(err);
      }


      done();
    })*/

  });

  it('should create manifest', function(done) {

    sk.create()
      .then(function() {
        (scope.targetPath + 'app/').should.be.a.directory().not.empty;
        done();
      })
    ;

  });

});
