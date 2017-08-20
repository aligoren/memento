'use strict'

module.exports = {
  name: 'dude',

  greet: function (name) {
    name = name || this.name
    return `Hello ${name}`
  },

  greetAsync: function * (name) {
    return `Hello ${name}`
  }
}
