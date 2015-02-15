var fs     = require('fs-extra')
  , chai   = require('chai')
  , chaifs = require('chai-fs')
  , copy   = require('../../lib/action/copy')

chai.use(chaifs)
chai.should();



describe('Action: copy', function() {

  var destinationFile   = './.tests/copy/index_copied.html';
  var destinationFolder = './.tests/copy/'

  var scope = {
    rootPath : __dirname + '/../fixtures/',
    payload  : { name: 'Hello world!' }
  };

  before(function(done) {

    fs.remove(destinationFolder, function(err) {

      if(err) {
        done(err);
      }

      done();
    })

  });

  it('should copy file', function(done) {

    copy(scope, destinationFile, { path: 'assets/index.html' })
      .then(function() {

        destinationFile.should.be.a.file('File does not copied');
        destinationFile.should.be.a.file('File is empty').and.not.empty;
        destinationFile.should.have.content('<h1>Hello World</h1>\n', 'Invalid content')

        done();
      })
      .catch(function(err) {
        done(err);
      })
    ;

  });

  it('should copy folder recursively', function(done) {

    copy(scope, destinationFolder, { path: 'assets/' })
      .then(function() {

        destinationFolder.should.be.a.directory('Empty folder').not.empty;
        (destinationFolder + 'index.html').should.be.a.file('Not exists');
        (destinationFolder + 'index.html').should.have.content('<h1>Hello World</h1>\n', 'Invalid content');
        (destinationFolder + 'subdir/assets.html').should.be.a.file('Not exists');
        (destinationFolder + 'subdir/assets.html').should.have.content('<h1>Assets</h1>\n', 'Invalid content');

        done();
      })
      .catch(function(err) {
        done(err);
      })
    ;

  });

});
