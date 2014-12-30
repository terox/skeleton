var  fs      = require('fs')
  , chai     = require('chai')
  , chaifs   = require('chai-fs')
  , template = require('../../lib/action/template')

chai.use(chaifs)
chai.should();



describe('Action: template', function() {

  var destination = './.tests/dist/README.md';

  var scope = {
    rootPath : __dirname + '/../fixtures/',
  };

  var config = {
    path : 'templates/README.tpl',
    data : { name: 'Hello world!' }
  };

  it('should create file from template', function(done) {

    template(scope, destination, config)
      .then(function() {

        destination.should.be.a.file('File is empty').and.not.empty;
        destination.should.have.content(config.data.name + '\n', 'Template failed')

        done();
      })
      .catch(function(err) {

        done(err)
      })
    ;

  });

});
