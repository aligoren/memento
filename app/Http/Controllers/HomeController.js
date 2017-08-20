'use strict'

class HomeController {
    * index(request, response) {
        const isLogged = yield request.session.get('isLogged');
        if(!isLogged) {
            response.redirect('/login')
        } else {
            yield response.sendView('content')
        }
    }
}

module.exports = HomeController
