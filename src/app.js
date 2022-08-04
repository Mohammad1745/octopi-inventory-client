import login from './js/login'
import register from "./js/register";

$('document').ready(() => {
    $('#app').append(login.template)
    $('#register_link').on('click', handleRegisterLink)
    login.script.loginButtonHandler()
})

function handleLoginLink (event) {
    $('#app').empty()
    $('#app').append(login.template)
    login.script.loginButtonHandler()
    $('#register_link').on('click', handleRegisterLink)
}
function handleRegisterLink (event) {
    $('#app').empty()
    $('#app').append(register.template)
    register.script.registerButtonHandler()
    $('#login_link').on('click', handleLoginLink)
}