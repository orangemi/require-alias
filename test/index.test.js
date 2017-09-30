'use strict'
/* global describe it beforeEach */

var path = require('path')
var expect = require('must')
var globalAlias = require('../')
var Alias = require('../').Alias

describe('Alias test suite', function () {
  var alias
  var root = path.resolve(__dirname, '../example')

  beforeEach(function () {
    alias = new Alias(root)
  })

  it('should set root to given path', function () {
    var newRoot = root + 'folders/'
    var returnRoot = alias.root = newRoot
    expect(replaceSlashes(returnRoot)).to.include('examplefolder')
  })

  it('should contain key "@foo" and "@bar" if passed these in an object', function () {
    alias.add({
      '@foo': 'foo/bar',
      '@bar': 'bar'
    })

    expect(alias.aliases).to.have.property('@foo')
    expect(alias.aliases).to.have.property('@bar')
  })

  it('should contain "@foo" if added to alias', function () {
    alias.add('@foo', '')
    expect(alias.aliases).to.have.property('@foo')
  })

  it('should not contain key @bar', function () {
    alias.add('@foo')
    expect(alias.aliases).to.not.have.property('@foo')
  })

  it('should not contain keys @foo, @bar if removed as an array', function () {
    alias.add({
      '@foo': 'foo/bar',
      '@bar': 'bar'
    })

    alias.set('@foo')
    alias.set('@bar')
    expect(alias.aliases).to.not.have.property('@foo')
    expect(alias.aliases).to.not.have.property('@bar')
  })

  it('should return correct path of file', function () {
    var fooPath = alias.path('folders/foo/file')
    expect(replaceSlashes(fooPath)).to.include('examplefoldersfoofile')
  })

  it('should return correct path of file', function () {
    alias.set('@bar', 'folders/bar')
    alias.set('@foo', 'folders/foo')
    var fooPath = alias.path('@foo/file')
    expect(replaceSlashes(fooPath)).to.include('examplefoldersfoofile')
  })

  it('should correct module export', function () {
    var fooPath = alias.require('folders/foo/file')
    expect(fooPath() === 'Hello Foo').to.be.true()
  })

  it('should throw error', function () {
    try {
      alias.require('asdf')
    } catch (e) {
      expect(e.message).to.include('Cannot find module')
      expect(e.message).to.include('asdf')
      return
    }
    throw new Error('should not reach here')
  })
})

function replaceSlashes (s) {
  return s.replace(/[/\\]/g, '')
}
