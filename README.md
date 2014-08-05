[![Coverage Status](https://img.shields.io/coveralls/manuelvulp/require-alias.svg)](https://coveralls.io/r/manuelvulp/require-alias)
[ ![Codeship Status for manuelvulp/require-alias](https://www.codeship.io/projects/9276ef20-fea0-0131-5487-5eefab01992e/status)](https://www.codeship.io/projects/29590)

![Alias logo](https://raw.githubusercontent.com/manuelvulp/require-alias/master/img/alias.jpg)

### [Node.js] Alias

Library that might help you deal with Node paths 


```
npm install require-alias
```

## Table of Contents

- [Example](#example)

- [API](#api)
  - [`alias(String, Boolean)`](#aliasstring-boolean)
 
  - `configure`

    - [`root(String)`](#rootstring)

    - [`paths(Object)`](#pathsobject)
    
  - [`storage`](#storage)

  - [`add(String, String)`](#addstring-string)

  - [`delete(String)`](#deletestring)

#Example

```javascript
var Alias = require('../lib/require-alias');

/**
 * In this description, ALIAS_ROOT points to path that is currently set
 * as root in Alias library and ROOT points to the root of this project. Also do
 * note that all paths are surrounded with {} just to avoid confusion
 *
 * --------------------------------------------------------------------------------
 *
 * By default ALIAS_ROOT points to your projects main file / runnable. Currently we
 * are running {example/app.js} file which means our ALIAS_ROOT points to
 * {ROOT/example/} directory. Say we want our alias to include files from project
 * root. We manually configure alias root to point one directory up
 */

Alias.configure.root('../');

/**
 * Everything is now relative to {/example/../} aka {ROOT}
 * Lets setup few aliases to point to some directories
 */

Alias.configure.paths({
    '@foo': 'example/folders/foo', // {ROOT/example/folders/foo}
    '@folders': 'example/folders' // {ROOT}/example/folders}
});

/**
 * Require files and execute
 */

var foo = alias('@foo/file');
var bar = alias('@folders/bar/file');

foo(); // Output: 'Hello Foo'
bar(); // Output: 'Hello Bar' 

/**
 * What about paths? To get paths, pass in second parameter as 'true'
 */

var fooPath = alias('@foo/file', true);
var barPath = alias('@folders/bar/file', true);

console.log(fooPath); // Output: PATH_TO_PROJECT\example\folders\foo\file
console.log(barPath); // Output: PATH_TO_PROJECT\example\folders\bar\file

/**
 * NB! If you haven't configured an alias for a path that you are trying to
 * require, it will use the default require method. In other words:
 *
 * alias('./folders/foo/file');
 *    is
 * require('./folders/foo/file');
 */

var fooAlias = alias('./folders/foo/file');
var fooRequire = require('./folders/foo/file');

fooAlias(); // Output: 'Hello Foo'
fooRequire(); // Output: 'Hello Foo'

var barAlias = alias('../example/folders/bar/file');
var barRequire = require('../example/folders/bar/file');

barAlias(); // Output: 'Hello Bar'
barRequire(); // Output: 'Hello Bar'

/**
 * If no relative path is defined (./ or ../), Alias tries to require this file
 * as ALIAS_ROOT + your_path
 */
 
var bazAlias = alias('example/baz'); // ALIAS_PATH + example/baz
// var bazRequire = require('example/baz'); // Does not work

bazAlias(); // Output: 'Hello Baz'
// bazRequire(); // Output: throws error
```

#API
List of all available methods

#### `alias(String, Boolean)`

- `String` - path to your file

- `Boolean` - Return file or path

```javascript
// $ node example/app.js
var file = alias('foo') // Returns export of file example/foo.js
```

```javascript
// $ node example/app.js
var file = alias('foo', true) // Returns path to example/foo
```

#### `root(String)`

- `String` - Assign new root relative to your main runnable

```javascript
// $ node example/dir/app.js
var Alias = require('require-alias');
Alias.configure.root('../');
// root is now example instead on example/dir
```

#### `paths(Object)`

- `Object` - Key-value object as key of alias and value of path

```javascript
// $ node example/app.js
var Alias = require('require-alias');
Alias.configure.paths({
    '@foo': 'folders/foo',
    '@bar': 'folder/test/bar'
});
// alias('@foo', true) points to example/folders/foo
// alias('@bar/test') points to example/folders/example/bar/test.js
```

#### `storage`

Returns current aliases as key-value object

```javascript
// $ node example/app.js
var Alias = require('require-alias');
Alias.configure.paths({
    '@foo': 'folders/foo',
    '@bar': 'folder/example/bar'
});

var foobar = Alias.storage;
/**
 * foobar equals
 *
 * {
 *     '@foo': 'folders/foo',
 *     '@bar': 'folder/example/bar'
 * }
 *
 */
```
#### `add(String, String)`

- `String` - Name of alias prefixed with `@` eg `@foo`
&nbsp;

- `String` - Path reference of alias eg `../folder/another/folder`

Add new alias to storage

```javascript
// $ node example/app.js
var Alias = require('require-alias');
Alias.add('@foo', 'example/foo');

var foobar = Alias.storage;

/** 
 * foobar equals
 * 
 * {
 *     '@foo': 'example/foo',
 * }
 * 
 */
```

#### `delete(String)`

- `String` - Name of existing alias
&nbsp;

Deletes alias from storage

```javascript
// $ node example/app.js
var Alias = require('require-alias');
Alias.add('@foo', 'example/foo');

var foobar = Alias.storage;

/** 
 * foobar equals
 * 
 * {
 *     '@foo': 'example/foo',
 * }
 * 
 */
 
Alias.delete('@foo');

/** 
 * foobar equals
 * 
 * {}
 * 
 */
 
```

