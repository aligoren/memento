'use strict'

/**
 * adonis-auth
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const proxyHandler = require('./proxyHandler')
const Schemes = require('../Schemes')
const Serializers = require('../Serializers')
const extendedSerializers = {}
const extendedSchemes = {}
const CatLog = require('cat-log')
const logger = new CatLog('adonis:auth')
const NE = require('node-exceptions')
const Ioc = require('adonis-fold').Ioc
require('harmony-reflect')

class AuthManager {

  constructor (config, request, name) {
    name = name || 'default'
    this.config = config
    this.request = request
    this.authenticatorInstance = this._getAuthenticator(name)
    return new Proxy(this, proxyHandler)
  }

  /**
   * exposes a method to be used by IoC container to
   * extend the manager by adding new serializers
   * and scheme.
   *
   * @param  {String} name
   * @param  {Mixed} value
   * @param  {String} type
   *
   * @public
   */
  static extend (name, value, type) {
    if (!type || !value || !name) {
      throw new NE.InvalidArgumentException('Make sure to provide the extend type name, type and body')
    }
    if (type !== 'serializer' && type !== 'scheme') {
      throw new NE.InvalidArgumentException('When extending Auth provider, type must be a serializer or an scheme')
    }
    this._addSerializerOrProvider(name, value, type)
  }

  /**
   * adds a custom scheme or serializer
   *
   * @param   {String} name
   * @param   {Mixed} value
   * @param   {String} type
   *
   * @private
   */
  static _addSerializerOrProvider (name, value, type) {
    if (type === 'serializer') {
      extendedSerializers[name] = value
    } else if (type === 'scheme') {
      extendedSchemes[name] = value
    }
  }

  /**
   * returns an instance of authenticator with a
   * given serializer
   *
   * @param  {String}          name
   * @return {Object}
   *
   * @private
   */
  _getAuthenticator (name) {
    name = this._makeAuthenticatorName(name)
    const config = this.config.get(name)
    if (!config) {
      throw new NE.DomainException(`Cannot find configuration for ${name} authenticator inside config/auth.js file.`)
    }
    const serializer = this._getSerializer(config.serializer)
    logger.verbose('making instance of %s authenticator', name)
    return this._makeScheme(config.scheme, serializer, config)
  }

  /**
   * returns configuration for a given authenticator
   * name.
   *
   * @param  {String}               name
   * @return {String}
   *
   * @private
   */
  _makeAuthenticatorName (name) {
    if (name === 'default') {
      name = this.config.get('auth.authenticator')
    }
    return `auth.${name}`
  }

  /**
   * returns the instance of serializer, made by IoC container.
   * @method _getSerializer
   * @param  {String}       serializer
   * @return {Object}
   *
   * @throws {DomainException} If cannot find given serializer
   *
   * @private
   */
  _getSerializer (serializer) {
    if (Serializers[serializer]) {
      return Ioc.make(Serializers[serializer])
    } else if (extendedSerializers[serializer]) {
      return extendedSerializers[serializer]
    }
    throw new NE.DomainException(`Cannot find ${serializer} serializer.`)
  }

  /**
   * makes the authenticator instance by grabbing the authenticator
   * defined as a scheme inside the config file
   * @method _makeAuthenticator
   * @param  {String}           scheme
   * @param  {Object}           serializer
   * @param  {Object}           options
   * @return {Object}
   *
   * @throws {DomainException} If cannot find a given authenticator
   *
   * @private
   */
  _makeScheme (scheme, serializer, options) {
    if (Schemes[scheme]) {
      const schemeInstance = new Schemes[scheme](this.request, serializer, options)
      return schemeInstance
    } else if (extendedSchemes[scheme]) {
      const schemeInstance = new extendedSchemes[scheme](this.request, serializer, options)
      return schemeInstance
    }
    throw new NE.DomainException(`Cannot find ${scheme} scheme.`)
  }

  /**
   * returns a new instance of itself but with a different
   * authenticator.
   *
   * @param  {String} name
   * @return {Object}
   *
   * @public
   */
  authenticator (name) {
    return new AuthManager(this.config, this.request, name)
  }
}

module.exports = AuthManager
