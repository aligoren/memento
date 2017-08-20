'use strict'

/**
 * adonis-auth
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

class AuthInit {

  constructor (AuthManager, Config, View) {
    this.AuthManager = AuthManager
    this.Config = Config
    this.view = View
  }

  * handle (request, response, next) {
    const view = response.viewInstance || this.view
    const AuthManager = this.AuthManager
    request.auth = new AuthManager(this.Config, request)
    request.currentUser = yield request.auth.getUser()
    view.global('currentUser', request.currentUser)
    yield next
  }

  /**
   * authenticates a web socket request using number of defined
   * authenticators.
   *
   * @param  {Object}   socket
   * @param  {Object}   request
   * @param  {Function} next
   *
   * @public
   */
  * handleWs (socket, request, next) {
    const AuthManager = this.AuthManager
    request.auth = new AuthManager(this.Config, request)
    request.currentUser = yield request.auth.getUser()
    socket.currentUser = request.currentUser
    yield next
  }

}

module.exports = AuthInit
