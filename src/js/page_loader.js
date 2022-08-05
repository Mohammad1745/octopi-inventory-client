import product from "./product";
import product_list from "./product_list";
import login from "./login";
import register from "./register";

let pageLoader = {
    loadLoginPage: () => {
        $('#app').empty()
        $('#app').append(login.template)
        $('#register_link').on('click', pageLoader.loadRegistrationPage)
        login.script.loginButtonHandler()
        login.script.checkAuth()
    },
    loadRegistrationPage:  () => {
        $('#app').empty()
        $('#app').append(register.template)
        register.script.registerButtonHandler()
        $('#login_link').on('click', pageLoader.loadLoginPage)
    },
    loadProductPage : () => {
        $('#app').empty()
        $('#app').append(product.template)
        $('#app').append(product_list.template)
        product_list.script.loadProductList()
        product.script.addButtonHandler()
    }
}

export default pageLoader
