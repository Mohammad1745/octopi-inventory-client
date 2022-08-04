import login from "./login";
import product from "./product";
import product_list from "./product_list";

export default {
    template : `
        <div class="row justify-content-md-center" style="margin-top: 100px">
            <div class="col-md-6">
                <div >
                    <div class="form-group">
                        <label for="nameInput">Name</label>
                        <input name="name" type="text" class="form-control" id="nameInput">
                    </div>
        
                    <div class="form-group">
                        <label for="emailInput">Email address</label>
                        <input name="email" type="email" class="form-control" id="emailInput" placeholder="Enter email">
                    </div>
        
                    <div class="form-group">
                        <label for="passwordInput">Password</label>
                        <input name="password" type="password" class="form-control" id="passwordInput" placeholder="Password">
                    </div>
        
                    <div class="form-group">
                        <label for="confirmPasswordInput">Confirm Password</label>
                        <input name="confirmPassword" type="password" class="form-control" id="confirmPasswordInput"
                               placeholder="Re-enter your password here">
                    </div>
        
                    <button type="button" class="btn btn-primary" id="register_btn">Register</button>
                </div>
                <div class="mt-2">Already have an account? Please  <span class="cursor-pointer no-underline fw-bolder text-secondary" id="login_link">Login</span>  </div>
            </div>
        </div>
    `,
    script: {
        registerButtonHandler: () => {
            $('#register_btn').on('click', event => {
                let formData = {
                    name: $('#nameInput').val(),
                    email: $('#emailInput').val(),
                    password: $('#passwordInput').val(),
                    confirmPassword: $('#confirmPasswordInput').val()
                }
                $.ajax({
                    url: 'http://127.0.0.1:8001/api/register',
                    type: 'post',
                    data: formData,
                }).done(responseHandler)
                .fail(error =>  {
                    console.log(error)
                })
            })
            function responseHandler  (response) {
                if (response.success) {
                    $('#app').empty()
                    $('#app').append(login.template)
                    login.script.loginButtonHandler()
                }
            }
        }
    }
}