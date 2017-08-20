'use strict'

/**
 * adonis-auth
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const BaseScheme = require('../BaseScheme')
const basicAuth = require('basic-auth')

class BasicAuthScheme extends BaseScheme {

  * _getRequestUser () {
    const authString = this.request.header('authorization') || this.request.input('basic')
    const credentials = basicAuth.parse(authString)
    if (!credentials) {
      return null
    }
    try {
      return yield this.validate(credentials.name, credentials.pass, {}, true)
    } catch (e) {
      return null
    }
  }

}

module.exports = BasicAuthScheme
