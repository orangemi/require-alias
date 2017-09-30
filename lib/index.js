'use strict'
var path = require('path')
var rootDirectory = path.resolve(__dirname, '../../')

var Alias = function (options) {
  options = options || {}
  if (typeof options === 'string') options = {root: options}
  this.root = options.root || rootDirectory
  this.aliases = options.aliases || {}
}

Alias.prototype.set = function (key, value) {
  if (key instanceof Object) {
    for (var _key in key) {
      this.set(_key, key[_key])
    }
    return this
  }

  if (value === undefined || value === null) {
    delete this.aliases[key]
  } else {
    this.aliases[key] = value
  }
  return this
}
Alias.prototype.add = Alias.prototype.set

Alias.prototype.path = function (filepath) {
  for (var key in this.aliases) {
    var regex = new RegExp('^' + key.replace(/[[]\.]/g, '\\$1'))
    if (regex.test(filepath)) {
      filepath = filepath.replace(regex, this.aliases[key])
      break
    }
  }
  return path.resolve(this.root, filepath)
}
Alias.prototype.resolve = Alias.prototype.path

Alias.prototype.require = function (filepath) {
  return require(this.path(filepath))
}

module.exports = new Alias()
module.exports.Alias = Alias
