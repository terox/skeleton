var  fs  = require('fs')
  , chai  = require('chai')
  , chaifs = require('chai-fs')
  , folder = require('../../lib/action/folder')

chai.use(chaifs)
chai.should();



describe('Action: folder', function() {

  var destination = './.tests/folder';

  var scope = {

  }

  before(function() {

    if(fs.existsSync(destination)) {
      fs.rmdirSync(destination);
    }

  });

  afterEach(function() {

    fs.rmdirSync(destination);

  });

  it('should create a empty folder with default configuration', function(done) {

    folder(scope, destination)
      .then(function() {

        destination.should.be.a.directory()
        destination.should.be.a.directory().and.empty

        done();
      })
    ;

  });

  it('should create empty folder with 0766 mode and 0002 mask', function(done) {

    folder(scope, destination, { mode: 0766, umask: 0002 })
      .then(function() {
        fs.stat(destination, function(err, stat) {

          // 4 = directory | 0 = special bit
          // See: https://github.com/joyent/node/issues/3045
          stat.mode.toString(8).should.be.equal('40764');

          done();
        })
      })
    ;

  });

});
