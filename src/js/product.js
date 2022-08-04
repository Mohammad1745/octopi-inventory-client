import product_list from "./product_list";

export default {
    template : `
        <div class="row justify-content-md-center" style="margin-top: 100px">
            <div class="col-md-6">
                <div >
                    <div class="form-group">
                        <label for="nameInput">Product Name</label>
                        <input name="name" type="text" class="form-control" id="nameInput" placeholder="Enter Product Name">
                    </div>
                    <div class="form-group">
                        <label for="manufacturerInput">Manufacturer Name</label>
                        <input name="manufacturer" type="text" class="form-control" id="manufacturerInput" placeholder="Enter manufacturer name">
                    </div>
                    <div class="form-group">
                        <label for="buyPriceInput">Buy Price</label>
                        <input name="buy_price" type="number" class="form-control" id="buyPriceInput" placeholder="Enter buy price">
                    </div>
                    <div class="form-group">
                        <label for="sellPriceInput">Sell Price</label>
                        <input name="sell_price" type="number" class="form-control" id="sellPriceInput" placeholder="Enter sell price">
                    </div>
                    <button type="button" class="btn btn-primary" id="add_btn">Add Product</button>
                </div>
            </div>
        </div>
    `,
    script: {
        addButtonHandler: () => {
            $('#add_btn').on('click', event => {
                let formData = {
                    name: $('#nameInput').val(),
                    manufacturer: $('#manufacturerInput').val(),
                    buy_price: $('#buyPriceInput').val(),
                    sell_price: $('#sellPriceInput').val(),
                }
                let authorization = JSON.parse(localStorage.getItem('authorization'))
                $.ajax({
                    url: 'http://127.0.0.1:8001/api/product',
                    type: 'post',
                    headers: {
                        authorization: authorization.tokenType+" "+authorization.token
                    },
                    data: formData,
                }).done(responseHandler)
                .fail(error =>  {
                    console.log(error)
                })
            })
            function responseHandler (response) {
                console.log(response)
                if (response.success) {
                    $('#app').children().last().remove();
                    $('#app').append(product_list.template)
                    product_list.script.loadProductList()
                }
            }
        },
    }
}