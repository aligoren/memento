'use strict'

/**
  * cat-log
  * Copyright(c) 2015-2015 Harminder Virk
  * MIT Licensed
*/

const log = require('npmlog')
const ms = require('ms')

let prevTime = null

class Logger {

  constructor(prefix, level) {
    const customLevel = this._returnCustomLevel()
    this.prefix = prefix || ''
    this._disableColors = false
    this._disableTime = false
    this.level = level || customLevel
  }

  /**
   * returns time to be displayed for logs
   *
   * @return  {String}
   *
   * @private
   */
  _getDisplayTime () {
    if (this._disableTime) {
      return ''
    }
    const currentTime = new Date()
    const timeDiff = prevTime ? `+${ms(Math.abs(currentTime.getTime() - prevTime.getTime()))}` : '0ms'
    prevTime = currentTime
    if (process.stdout.isTTY) {
      return !this._disableColors ? `\u001b[033m${timeDiff}\u001b[39m` : timeDiff
    }
    return `[${currentTime}]`
  }

  /**
   * @description returns custom level based upon
   * command line arguments
   * @method _returnCustomLevel
   * @return {String}
   * @private
   */
  _returnCustomLevel () {
    const args = process.argv.slice(2)
    if(args.indexOf('--silly') > -1) {
      return 'silly'
    }
    else if(args.indexOf('--verbose') > -1) {
      return 'verbose'
    }
    else if(args.indexOf('--debug') > -1) {
      return 'http'
    }
    return 'info'
  }

  /**
   * @description set's npm log level
   * before calling log method
   * @method _setLevel
   * @private
   */
  _setLevel () {
    log.level = this.level
  }

  /**
   * prefixing additional args before logging
   *
   * @param   {Array} args
   *
   * @private
   */
  _prefixAdditionals (args) {
    args.unshift(this.prefix)
    args[1] = `${this._getDisplayTime()} ${args[1]}`
  }

  /**
   * @description calls info method on npm
   * log object
   * @method info
   * @param  {String} message
   * @param  {Mixed} extra
   * @return {void}
   * @public
   */
  info () {
    this._setLevel()
    const args = Array.prototype.slice.call(arguments)
    this._prefixAdditionals(args)
    log.info.apply(this,args)
  }

  /**
   * @description calls verbose method on npm
   * log object
   * @method verbose
   * @param  {String} message
   * @param  {Mixed} extra
   * @return {void}
   * @public
   */
  verbose () {
    this._setLevel()
    const args = Array.prototype.slice.call(arguments)
    this._prefixAdditionals(args)
    log.verbose.apply(this, args)
  }

  /**
   * @description calls info method on npm
   * log object
   * @method debug
   * @param  {String} message
   * @param  {Mixed} extra
   * @return {void}
   * @public
   */
  debug () {
    this._setLevel()
    const args = Array.prototype.slice.call(arguments)
    this._prefixAdditionals(args)
    log.http.apply(this,args)
  }

  /**
   * @description calls info method on npm
   * log object
   * @method warn
   * @param  {String} message
   * @param  {Mixed} extra
   * @return {void}
   * @public
   */
  warn () {
    this._setLevel()
    const args = Array.prototype.slice.call(arguments)
    this._prefixAdditionals(args)
    log.warn.apply(this,args)
  }

  /**
   * @description calls info method on npm
   * log object
   * @method error
   * @param  {String} message
   * @param  {Mixed} extra
   * @return {void}
   * @public
   */
  error () {
    this._setLevel()
    const args = Array.prototype.slice.call(arguments)
    this._prefixAdditionals(args)
    log.error.apply(this,args)
  }

  /**
   * @description calls info method on npm
   * log object
   * @method silly
   * @param  {String} message
   * @param  {Mixed} extra
   * @return {void}
   * @public
   */
  silly () {
    this._setLevel()
    const args = Array.prototype.slice.call(arguments)
    this._prefixAdditionals(args)
    log.silly.apply(this,args)
  }

  /**
   * disable local and npmlog colors
   *
   * @public
   */
  disableColor() {
    this._disableColors = true
    log.disableColor()
  }

  /**
   * disable timestamps
   *
   * @public
   */
  disableTimeStamps() {
    this._disableTime = true
  }
}

module.exports = Logger
