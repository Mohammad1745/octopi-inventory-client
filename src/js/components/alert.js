import product_list from "./product_list";
import pageLoader from "../page_loader";

export default {
    template : `
        <div class="row justify-content-md-center" style="margin-top: 100px">
            <div class="col-md-12">
                <div class="alert alert-success" role="alert" id="alert_success">
                  Success
                </div>
                <div class="alert alert-danger" role="alert" id="alert_danger">
                  Error
                </div>
            </div>
        </div>
    `,
    script: {
        showAlert: (type, message) => {
            if (type==="success") {
                $('#alert_success').text( message)
                $('#alert_success').show()
                if ($('#alert_danger')) $('#alert_danger').hide()
            }
            else {
                $('#alert_danger').text( message)
                $('#alert_danger').show()
                if ($('#alert_success')) $('#alert_success').hide()
            }
            setTimeout(()=> {
                if ($('#alert_danger')) $('#alert_danger').hide()
                if ($('#alert_success')) $('#alert_success').hide()
            },1500)
        },
    }
}