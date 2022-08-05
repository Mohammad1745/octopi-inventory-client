import pageLoader from "../page_loader";
import alert from "./alert";

let productList = {
    template : `
        <div class="row justify-content-md-center" style="margin-top: 100px">
            <div class="col-md-12">
                <table id="myTable" class="display">
                     <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Manufacturer</th>
                            <th>Buy Price</th>
                            <th>Sell Price</th>
                        </tr>
                    </thead>
<!--                    <tbody></tbody>-->
                </table>
            </div>
        </div>
    `,
    script: {
        loadProductList: () => {
            let authorization = JSON.parse(localStorage.getItem('authorization'))
            $('#myTable').DataTable({
                processing: true,
                serverSide: true,
                pageLength: 10,
                order:[0,'asc'],
                searching: true,
                async: true,
                columnDefs: [
                    {"className": "text-center", "targets": "_all"}
                ],
                columns: [
                    { data: 'name' },
                    { data: 'manufacturer' },
                    { data: 'buy_price' },
                    { data: 'sell_price' }
                ],
                ajax: {
                    url: 'http://127.0.0.1:8001/api/product',
                    type: 'get',
                    headers: {
                        authorization: authorization.tokenType+" "+authorization.token
                    },
                    dataFilter: function(response){
                        response = JSON.parse( response )
                        if (response.success) return JSON.stringify( response.data);
                        else {
                            alert.script.showAlert('error', response.message)
                            localStorage.removeItem('authorization')
                            pageLoader.loadLoginPage()
                        }
                    },
                },
                language: {
                    paginate: {
                        next: 'Next &#8250;',
                        previous: '&#8249; Previous'
                    },
                    search: "_INPUT_",
                    searchPlaceholder: "Search...",
                },
            })
        },
    }
}
export default productList