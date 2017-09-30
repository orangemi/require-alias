
 Require Alias
======
[![Coverage Status](https://img.shields.io/coveralls/orangemi/require-alias.svg)](https://coveralls.io/r/orangemi/require-alias)

Library that might help you deal with Node paths 

## Install

```
npm install @orangemi/require-alias
```

## Quick example

```javascript
// app.js
var alias = require('require-alias')
alias.set('$alias', 'relative/path/to/file')
var a = require('$alias/a')
```

```javascript
// relative/path/to/a
var alias = require('require-alias')
var b = alias.require('$alias/b')
```


## API
default export an alias instance with root is where `package.json` is

### class export.Alias(root, alias)
if root is Object then root = root.root, alias = root.alias
 - root: **String** is the root path to require file. Default is where the `package.json` is.
 - alias: **Object** is the map of alias. key is the alias and the value is relative path to `root`.

Caution: you may use `@` in alias but may cause trouble when install npm scoped dependencies.

### Alias#require(filepath)
Return the module export of alias. Function like `module.require` but just replace the path in alias instance settings.
 - filepath: **String**

### Alias#path(filepath)
Return the absolute path for the file
 - filepath: **String**

### Alias#set(alias, filepath)
Add single alias. If filepath is `null` or `undefined` it will act as to remove the setting, If the first parameter is an `object`, it will iterate the object and recursive run `alias.set` function
- alias: **String** alias name eg. `$foo`
- filepath: reference of alias eg. `'../folder/another/folder`

### Alias#add(alias, filepath)
Alias for alias.set(alias, filepath)
