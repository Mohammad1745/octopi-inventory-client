import register from "./register";
import product from "./product";
import product_list from "./product_list";

export default {
    template : `
        <div class="row justify-content-md-center" style="margin-top: 100px">
            <div class="col-md-6">
                <div >
                    <div class="form-group">
                        <label for="emailInput">Email address</label>
                        <input name="email" type="email" class="form-control" id="emailInput" placeholder="Enter email">
                    </div>
        
                    <div class="form-group">
                        <label for="passwordInput">Password</label>
                        <input name="password" type="password" class="form-control" id="passwordInput" placeholder="Password">
                    </div>
                    <button type="button" class="btn btn-primary" id="login_btn">Login</button>
                </div>
                <div class="mt-2">Doesn't have an account? Please <span class="cursor-pointer no-underline fw-bolder text-secondary" id="register_link">Register</span> </div>
                </div>
        </div>
    `,
    script: {
        loginButtonHandler: () => {
            $('#login_btn').on('click', event => {
                let formData = {
                    email: $('#emailInput').val(),
                    password: $('#passwordInput').val()
                }
                $.ajax({
                    url: 'http://127.0.0.1:8001/api/login',
                    type: 'post',
                    data: formData,
                }).done(responseHandler)
                .fail(error =>  {
                    console.log(error)
                })
            })
            function responseHandler  (response) {
                if (response.success) {
                    localStorage.setItem('authorization', JSON.stringify(response.data.authorization))

                    $('#app').empty()
                    $('#app').append(product.template)
                    $('#app').append(product_list.template)
                    product_list.script.loadProductList()
                    product.script.addButtonHandler()
                }
            }
        },
    }
}