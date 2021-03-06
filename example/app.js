/**
 * Require and configure Alias with initial options
 */

var Alias = require('../').Alias

var exampleAlias = new Alias({
  root: './example/app/',
  aliases: {
    '@models': 'models',
    '@random': 'random',
    '@another': 'another/path',
    '@and': 'another/path'
  }
})

/**
 * Add some more aliases
 */

exampleAlias.set({
  '@handlers': 'handlers',
  '@bar': 'models/bar'
})

/**
 * Add single alias
 */

exampleAlias.add('@bar', 'models/bar')

/**
 * Delete single alias
 */

// exampleAlias.delete('@random')

/**
 * Delete multiple aliases
 */

// exampleAlias.delete(['@another', '@and'])

/**
 * Get path to foo using alias + path
 */

var pathToFoo = exampleAlias.path('@handlers/for/foo')
var foo = require(pathToFoo)
console.log(foo()) // Output: Foo

/**
 * Get path to bar with using only alias
 */

var pathToBar = exampleAlias.path('@bar')
var bar = require(pathToBar)
console.log(bar()) // Output: Bar

/**
 * Require module using alias
 */

var moduleFoo = exampleAlias.require('@handlers/for/foo')
console.log(moduleFoo()) // Output: Foo

/**
 * This is the basic usage.
 *
 * You can also use it in other ways to make your life easier. Say you don't like
 * the functionality of default require and do not wish to write most of the time
 *
 *      require(alias('@foo/bar'))
 *
 * You may assign alias to global variable and use it instead of require:
 */

// global.alias = exampleAlias

// /**
//  * Just an example
//  */

// alias.add('@baz', 'baz')
// var baz = alias.require('@baz')
// console.log(baz()) // Output: Baz

// var pathToBaz = alias.path('@baz')
// console.log(pathToBaz) // Output: C:\require-alias\example\app\baz (Or wherever
                        // your project is located

/**
 * Note
 *
 * Whether you assign alias to global variable or not is up to you. Even though it is
 * highly recommended (and also a good practice) to not assign anything to global
 * variables, this might be a good candidate for global scope. The intent of this "helper"
 * was to make requiring modules and paths easier, maybe even replace the majority of
 * cases where "require" is used.
 *
 */
