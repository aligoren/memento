'use strict'

/**
 * adonis-binding-resolver
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const NE = require('node-exceptions')

class Resolver {

  constructor (Ioc) {
    this.Ioc = Ioc
  }

  validateBinding (binding) {
    if (typeof (binding) !== 'function' && typeof (binding) !== 'string') {
      throw new NE.InvalidArgumentException('Handler must point to a valid namespace or a closure', 500, 'E_INVALID_IOC_BINDING')
    }
    if (typeof (binding) === 'string' && binding.split('.').length !== 2) {
      throw new NE.InvalidArgumentException('Make sure IoC container binding points to a method', 500, 'E_INVALID_IOC_BINDING')
    }
  }

  resolveBinding (binding) {
    if (typeof (binding) === 'function') {
      return binding
    }
    if (typeof (binding) === 'string') {
      return this.Ioc.makeFunc(binding)
    }
  }

  executeBinding (binding, args, customInstance) {
    args = args || []
    const resolvedBinding = this.resolveBinding(binding)
    if (typeof (resolvedBinding) === 'function') {
      return resolvedBinding.apply(customInstance || null, args)
    }
    if (resolvedBinding.instance && resolvedBinding.method) {
      return resolvedBinding.instance[resolvedBinding.method].apply(customInstance || resolvedBinding.instance, args)
    }
  }

}

module.exports = Resolver
