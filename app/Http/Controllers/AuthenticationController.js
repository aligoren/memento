'use strict'

const crypto = use('crypto');

const User = use('App/Model/User')


class AuthenticationController {
    * index(request, response) {
        yield request.session.put('isLogged', true);
        yield response.sendView('general/login');
    }

    * check_login(request, response) {

        const user = new User();

        const data = request.post();

        const username = data.username;
        const password = crypto
                        .createHash('md5')
                        .update(data.password)
                        .digest('hex');

        const logged_user = yield User.query()
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
        }
        
        response.json(returnData);
    }
}

module.exports = AuthenticationController
