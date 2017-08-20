'use strict'

const ServiceProvider = require('adonis-fold').ServiceProvider

class AuthManagerProvider extends ServiceProvider {

  * register () {
    this._bindManager()
    this._bindMiddleware()
    this._bindCommands()
  }

  _bindMiddleware () {
    this.app.bind('Adonis/Middleware/AuthInit', function (app) {
      const AuthManager = app.use('Adonis/Src/AuthManager')
      const Config = app.use('Adonis/Src/Config')
      const View = app.use('Adonis/Src/View')
      const AuthInit = require('../middleware/AuthInit')
      return new AuthInit(AuthManager, Config, View)
    })

    this.app.bind('Adonis/Middleware/Auth', function (app) {
      const Auth = require('../middleware/Auth')
      return new Auth()
    })
  }

  _bindCommands () {
    this.app.bind('Adonis/Commands/Auth:Setup', function () {
      const AuthSetup = require('../commands/Setup')
      return new AuthSetup()
    })
  }

  _bindManager () {
    this.app.manager('Adonis/Src/AuthManager', require('../src/AuthManager'))
    this.app.singleton('Adonis/Src/AuthManager', function () {
      return require('../src/AuthManager')
    })
  }

}

module.exports = AuthManagerProvider
