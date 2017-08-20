'use strict'

const chai = require('chai')
const assert = chai.assert
const Resolver = require('../index')
const path = require('path')
const Ioc = require('adonis-fold').Ioc
require('co-mocha')

describe('description', function () {
  before(function () {
    Ioc.autoload('App', path.join(__dirname, './app'))
  })

  it('should throw an error when binding is not a string or a function', function () {
    const resolver = new Resolver({})
    const fn = () => resolver.validateBinding({})
    assert.throw(fn, 'InvalidArgumentException: E_INVALID_IOC_BINDING: Handler must point to a valid namespace or a closure')
  })

  it('should work fine when binding is a function', function () {
    const resolver = new Resolver({})
    const fn = () => resolver.validateBinding(function () {})
    assert.doesNotThrow(fn)
  })

  it('should work fine when binding is a string', function () {
    const resolver = new Resolver({})
    const fn = () => resolver.validateBinding('App/Foo.make')
    assert.doesNotThrow(fn)
  })

  it('should return the function back when trying to resolve a closure', function () {
    const resolver = new Resolver({})
    const foo = function () {}
    const binding = resolver.resolveBinding(foo)
    assert.equal(foo, binding)
  })

  it('should return the resolve instance and method from IoC container when binding is a string', function () {
    const resolver = new Resolver(Ioc)
    const binding = resolver.resolveBinding('App/Bindings/Foo.greet')
    assert.property(binding, 'instance')
    assert.property(binding, 'method')
    assert.isFunction(binding.instance[binding.method])
  })

  it('should execute the function when binding is a closure', function () {
    const resolver = new Resolver(Ioc)
    const binding = resolver.executeBinding(function () {
      return 'foo'
    })
    assert.equal(binding, 'foo')
  })

  it('should pass arguments to the binding when binding is a closure', function () {
    const resolver = new Resolver(Ioc)
    const binding = resolver.executeBinding(function (name, age) {
      return `${name} is ${age} years old`
    }, ['virk', 27])
    assert.equal(binding, 'virk is 27 years old')
  })

  it('should pass custom instance to the binding when binding is a closure', function () {
    const resolver = new Resolver(Ioc)
    const me = {
      name: 'virk'
    }
    const binding = resolver.executeBinding(function (age) {
      return `${this.name} is ${age} years old`
    }, [27], me)
    assert.equal(binding, 'virk is 27 years old')
  })

  it('should execute the function when binding is a string', function () {
    const resolver = new Resolver(Ioc)
    const binding = resolver.executeBinding('App/Bindings/Foo.greet')
    assert.equal(binding, 'Hello dude')
  })

  it('should pass args to the function when binding is a string', function () {
    const resolver = new Resolver(Ioc)
    const binding = resolver.executeBinding('App/Bindings/Foo.greet', ['virk'])
    assert.equal(binding, 'Hello virk')
  })

  it('should pass custom instance to the function when binding is a string', function () {
    const resolver = new Resolver(Ioc)
    const me = {
      name: 'foo'
    }
    const binding = resolver.executeBinding('App/Bindings/Foo.greet', [], me)
    assert.equal(binding, 'Hello foo')
  })

  it('should work fine when binding string resolves to a generator method', function * () {
    const resolver = new Resolver(Ioc)
    const binding = resolver.executeBinding('App/Bindings/Foo.greetAsync', ['virk'])
    const result = yield binding
    assert.equal(result, 'Hello virk')
  })

  it('should work fine when binding closure resolves to a generator method', function * () {
    const resolver = new Resolver(Ioc)
    const binding = resolver.executeBinding(function * (name) { return name }, ['virk'])
    const result = yield binding
    assert.equal(result, 'virk')
  })
})
