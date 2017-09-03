'use strict'

const crypto = use('crypto');

const User = use('App/Model/User')
const Hash = use('Hash')

class AuthenticationController {
    * index(request, response) {
        yield request.session.put('isLogged', true);
        yield response.sendView('general/login');
    }

    * check_login(request, response) {

        const user = new User();

        const data = request.post();

        const username = request.input('username');
        const password = request.input('password');

        /* const logged_user = yield User.query()
        .select('id', 'username')
        .where({
            'username': username,
            'password': password
        }).first()

        const returnData = {
            status: false,
        }

        if(logged_user) {
            returnData.status = true;
            request.session.put({
                isLogged: false,
                user_details: 1,
            });
        } */
        

        try {
            const login = yield request.auth.attempt(username,password)
            
            if(login) {
                return response.send(login)
            } else {
                return response.send("yok")
            }
        } catch (e) {
            return response.unauthorized('Invalid credentails')
        }
    }
}

module.exports = AuthenticationController
