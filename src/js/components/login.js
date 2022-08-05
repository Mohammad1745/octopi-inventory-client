import pageLoader from '../page_loader'
import alert from "./alert";

let login = {
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
        checkAuth: () => {
            let authorization = JSON.parse(localStorage.getItem('authorization'))
            if (authorization) {
                pageLoader.loadProductPage()
            }
        },
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
                    pageLoader.loadProductPage()
                    alert.script.showAlert('success', response.message)
                }else {
                    console.log(response)
                    alert.script.showAlert('error', response.message)
                }
            }
        },
    }
}
export default login