'use strict'

class AuthenticationController {
    * index(request, response) {
        yield response.sendView('general/login');
    }
}

module.exports = AuthenticationController
