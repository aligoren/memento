'use strict'

/**
 * node-scp
 * Copyright(c) 2016-2016 Harminder Virk
 * MIT Licensed
*/

let headers = exports = module.exports = {}

/**
 * @description list of csp headers used by different browsers
 * @type {Array}
 */
const cspHeaders = [
  'Content-Security-Policy',
  'X-Content-Security-Policy',
  'X-WebKit-CSP'
]

/**
 * @description returns headers required by IE
 * @method IE
 * @param {Object} browser
 * @return {Array}
 * @public
 */
headers.IE = function (browser) {
  const version = parseFloat(browser.version)
  if (version < 12 & version > 9) {
    return ['X-Content-Security-Policy']
  } else if (version > 12) {
    return ['Content-Security-Policy']
  } else {
    return []
  }
}

/**
  * @description returns headers required by FireFox
  * @method FireFox
  * @param {Object} browser
  * @return {Array}
 * @public
 */
headers.Firefox = function (browser) {
  const version = parseFloat(browser.version)
  if (version >= 23) {
    return ['Content-Security-Policy']
  } else if (version >= 4 && version < 23) {
    return ['X-Content-Security-Policy']
  } else {
    return []
  }
}

/**
  * @description returns headers required by FireFox
  * @method Chrome
  * @param {Object} browser
  * @return {Array}
 * @public
 */
headers.Chrome = function (browser) {
  const version = parseFloat(browser.version)
  if (version >= 14 && version < 25) {
    return ['X-WebKit-CSP']
  } else if (version >= 25) {
    return ['Content-Security-Policy']
  } else {
    return []
  }
}

/**
  * @description returns headers required by FireFox
  * @method Safari
  * @param {Object} browser
  * @return {Array}
 * @public
 */
headers.Safari = function (browser) {
  const version = parseFloat(browser.version)
  if (version >= 7) {
    return ['Content-Security-Policy']
  } else if (version >= 6) {
    return ['X-WebKit-CSP']
  } else {
    return []
  }
}

/**
  * @description returns headers required by FireFox
  * @method Opera
  * @param {Object} browser
  * @return {Array}
 * @public
 */
headers.Opera = function (browser) {
  const version = parseFloat(browser.version)
  return version >= 15 ? ['Content-Security-Policy'] : []
}

/**
 * @descrption returns headers required by Android Browser
 * @method Android Browser
 * @param  {Object} browser
 * @param  {Object} options
 * @return {Array}
 * @public
 */
headers['Android Browser'] = function (browser, options) {
  const version = parseFloat(browser.os.version)
  return (version < 4.4 || options.disableAndroid) ? [] : ['Content-Security-Policy']
}

/**
  * @description returns headers required by Chrome Mobile
  * @method Chrome Mobile
  * @param {Object} browser
  * @return {Array}
  * @public
 */
headers['Chrome Mobile'] = function (browser) {
  return browser.os.family === 'iOS' ? ['Content-Security-Policy'] : headers['Android Browser'].apply(this, arguments)
}

/**
  * @description returns headers required by IE Mobile
  * @method IE Mobile
  * @param {Object} browser
  * @return {Array}
  * @public
 */
headers['IE Mobile'] = headers.IE

/**
 * @description returns all csp headers
 * @method getAllHeaders
 * @return {Array}
 * @public
 */
headers.getAllHeaders = function () {
  return cspHeaders
}
