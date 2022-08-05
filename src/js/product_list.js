export default {
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
                    dataFilter: function(data){
                        var json = JSON.parse( data ).data;
                        console.log(json)
                        return JSON.stringify( json); // return JSON string
                    }
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
        }
    }
}