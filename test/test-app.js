/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('ify:app', function () {

  before(function (done) {

    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'noNPM': true })
      .withPrompt({
        useGrunt: true,
        useLocalServer: true
      })
      .on( 'end', done );
  });

  it('creates files', function () {

    assert.file([
      'package.json',
      'Gruntfile.js',
      'index.js',
      'app/index.html'
    ]);
  });
});
