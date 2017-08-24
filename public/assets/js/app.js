import * as $ from "./jquery.min";

import "./admin";

import "../css/bootstrap.css";
import "../css/waves.css";
import "../css/style.css";
import "../css/themes/theme-red.css";

var btnLogin = document.querySelector('.btn-login');

if(btnLogin) {
    btnLogin.addEventListener("click", function() {
        var frmLogin = new FormData(document.querySelector("#sign_in"));
    
        fetch('/ajax/check_login', {
            method: 'POST',
            body: frmLogin,
        }).then(function(resp) {
            return resp.json();
        }).then(function(obj) {
            if(obj.status) {
                window.location.href = "/";
            } else {
                alert("Username or password was wrong!");
            }
        })
    })
}