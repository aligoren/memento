'use strict'

class HomeController {
    * index(request, response) {
        const isLogged = yield request.session.get('isLogged');
        const user_details = yield request.session.get('isLogged');

        if(!isLogged) {
            response.redirect('/login')
        } else {
            console.log(user_details)
            yield request.session.forget('isLogged');
            yield response.sendView('content')
        }
    }
}

module.exports = HomeController
