# Dwell

Unfortunately Javascript does not have a reflection api to inspect methods to get list of method arguments.
Dwell will help you in inspecting a method or class contructor to get an array of parameters.

```javascript

var dwell = require('dwell')

class Greet {

  constructor (foo,bar) {

  }
}

dwell.inspect(Greet.toString())
// outputs ['foo','bar']
```

or for a javascript function 

```javascript
function HelloWorld(baz) {
  
}
dwell.inspect(HelloWorld.toString())
// outputs ['baz']
```
