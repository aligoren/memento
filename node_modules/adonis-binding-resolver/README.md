# Adonis Binding Resolver

Adonis binding resolver is a thin module to validate, resolve and execute
bindings attached as a closure or IoC container binding. 

For example: A route handler can point to `closure` or reference to controller method.

```javascript
Route.get('/', function * (request, response) {

})

// or 

Route.get('/', 'HomeController.index')
```


Now manually parsing the 2nd argument can become a little gross as you have to take care of following things.

1. Validate the argument to make sure it is a function or a string only.
2. If 2nd argument is a function, make sure to execute it as a function.
3. If it is a string, parse the string and fetch the right module and function of the string.
4. Also make sure that string argument method has correct reference to the scope `this`.

This module takes care of all this for you.

## Validate Binding
```javascript
const Resolver = require('adonis-binding-resolver')
const Ioc = require('adonis-fold').Ioc
const resolver = new Resolver(Ioc)

Ioc.validateBinding('App/Http/Controllers/HomeController.index') // works fine
Ioc.validateBinding(function () {}) // works fine
Ioc.validateBinding(null) // throws exception
Ioc.validateBinding({}) // throws exception
Ioc.validateBinding('') // throws exception
Ioc.validateBinding('App/Http/Controllers/HomeController') // throws exception, since method is not defined
```


## Resolve Binding
```javascript
const Resolver = require('adonis-binding-resolver')
const Ioc = require('adonis-fold').Ioc
const resolver = new Resolver(Ioc)

Ioc.resolveBinding('App/Http/Controllers/HomeController.index') // returns {instance: HomeController, method: 'index'}

Ioc.resolveBinding(function () {}) // returns function () {}
```

## Execute Binding

Executing binding will automatically resolve it for you. Just make sure to call `validatingBinding` first.

```javascript
const Resolver = require('adonis-binding-resolver')
const Ioc = require('adonis-fold').Ioc
const resolver = new Resolver(Ioc)

Ioc.validateBinding('App/Http/Controllers/HomeController.index') // make sure binding is fine

const result = Ioc.executeBinding('App/Http/Controllers/HomeController.index')
console.log(result)
```


## Passing Data when executing

You can also pass data when executing a binding. Data is passed as an array, which is passed as multiple arguments to the resolved method using `apply` method.

```javascript
const request = {} // your http request
const response = {} // your http response
const result = Ioc.executeBinding('App/Http/Controllers/HomeController.index', [request, response])
```

## Passing custom scope

At times you may want to override the current instance of a module/class and pass your own custom instance. Same can be done by passing 3rd argument to the `executeBinding` method.

```javascript
const modelInstance = {}
const result = Ioc.executeBinding('App/Http/Model/Hooks/Password.encrypt', [], modelInstance)
```


## Used By

This module is used by

1. adonis-framework
2. adonis-lucid
3. adonis-redis
