'use strict'

/**
 * adonis-auth
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

const util = exports = module.exports = {}

/**
 * returns the UTC version for a given date object, UTC
 * version does not entertain the daylight saving.
 *
 * @param  {Date} date
 * @return {Number}
 *
 * @public
 */
util.toUtc = function (date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())
}

/**
 * returns diff of two date objects by converting them
 * to UTC dates.
 * @param  {Date} dateFrom
 * @param  {Date} dateTo
 * @return {Number} - Diff in Milliseconds
 *
 * @publi
 */
util.dateDiff = function (dateFrom, dateTo) {
  return Math.floor(util.toUtc(dateTo) - util.toUtc(dateFrom))
}
