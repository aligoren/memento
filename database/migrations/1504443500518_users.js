'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.createIfNotExists('users', (table) => {
      table.increments()
      table.string('username', 20)
      table.string('password', 512)
      table.string('name', 30)
      table.string('surname', 30)
      table.string('email', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }

}

module.exports = UsersTableSchema
