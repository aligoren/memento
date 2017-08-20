'use strict'

/**
 * dwell
 * Copyright(c) 2015-2015 Harminder Virk
 * MIT Licensed
*/

const regex = /(constructor|^function)\s*\w*\(([\s\S]*?)\)/
const replaceRegExp = /[ ,\n\r\t]+/

/**
 * @module dwell
 * @description Parses constructor method to get it's parameter
 */
let dwell = exports = module.exports = {}

/**
 * @function inspect
 * @description inspect constructor method to get parameters
 * as array
 * @param  {Function} fn
 * @return {Array}
 */
dwell.inspect = function (fn) {
  let fnArguments = regex.exec(fn)

  /**
   * if unable to parse using regex , return empty array
   */
  if (!fnArguments || !fnArguments[2]) {
    return []
  }

  fnArguments = fnArguments[2].trim()
  if (fnArguments.length === 0) return []

  /**
   * break comma seperated arguments into an array
   */
  return fnArguments.split(replaceRegExp)
}