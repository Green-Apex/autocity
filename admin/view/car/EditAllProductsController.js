'use strict';

autoscityControllers.controller('EditAllProductsController', ['$scope', '$window', 'getallproducts', '$location',
    function ($scope, $window, getallproducts, $location) {

        $("#loader").fadeOut();

        updateCategory.save({productID: productID}, {
            "catrgoryName": data.name,
            "description": data.description
        }, function (response) {
            $.toaster("Update Data Successfully", 'Congratulation', 'success');
            getCategoryByCategoryID.get({categoryID: id}, function (response) {
                {
                    $("#loader").fadeOut();
                    return data = {
                        "id": response.data.categoryID,
                        "name": response.data.catrgoryName,
                        "description": response.data.description
                    }
                }
            })
        });

    }]);
