# Mixin for ES6 classes

[![Build Status](https://travis-ci.org/rambler-digital-solutions/es6-class-mixin.svg?branch=master)](https://travis-ci.org/rambler-digital-solutions/es6-class-mixin)

Mixins for ES6 Classes. Based on [@mattmccray's gist](https://gist.github.com/mattmccray/e41e2bf18b13a153ce67)

## Install

```
npm i -S es6-class-mixin
```

## API

`mixin` extends given class by object with functions or properties.

```js
mixin(ParentClass, ...mixins) // return new MixedClass extended by Mixins
```

## Examples

```js
// Basic
const mixin = require('es6-class-mixin');

class ListItem {};

let draggable = {
  drag() { /* … */ }
};

let droppable = {
  drop() { /* … */ }
};

class DraggableItem extends mixin(ListItem, draggable, droppable) {}
```

```js
// Backbone
class Input extends mixin(Backbone.View, Dispatcher.mixin) {}
```

- - -

## License

MIT
