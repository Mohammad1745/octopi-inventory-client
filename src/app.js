import login from './js/login'
import register from "./js/register";

$('document').ready(() => {
    $('#app').append(login.template)
    $('#register_link').on('click', loadRegistrationPage)
    login.script.loginButtonHandler()
    login.script.checkAuth()
})

function loadLoginPage (event) {
    $('#app').empty()
    $('#app').append(login.template)
    login.script.loginButtonHandler()
    $('#register_link').on('click', loadRegistrationPage)
}
function loadRegistrationPage (event) {
    $('#app').empty()
    $('#app').append(register.template)
    register.script.registerButtonHandler()
    $('#login_link').on('click', loadLoginPage)
}