'use strict'

/**
 * adonis-auth
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

let proxyHandler = exports = module.exports = {}

proxyHandler.get = function (target, name) {
  if (target[name]) {
    return target[name]
  }
  return target.authenticatorInstance[name]
}
