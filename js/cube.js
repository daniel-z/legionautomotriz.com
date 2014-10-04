(function ($) {
    var ordersData;

    var getOrderData = function (orderID) {
        $.get("https://data.brace.io/ss/pdmo34M7zagGsT5T9TGmWN", function (ordersData) {
            var order = searchOrder(ordersData, orderID);
            console.log(order);
        });
    };

    var searchOrder = function (ordersData, orderID) {
        var order = {};
        $.each(ordersData.rows, function (index, orderObj) {
            if (orderObj.OrderID === parseInt(orderID)) {
                order = orderObj;
            }
            return;
        });
        return order;
    };

    window.getOrderData = getOrderData;

})($);
