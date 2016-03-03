'use strict';

autoscityControllers.controller('carDetailController', ['$scope', '$window','detailProduct', '$location',
    function ($scope, $window, detailProduct, $location) {

        $("#loader").fadeOut();
        var searchObject = $location.search();
        $scope.productID = searchObject.productID;

        detailProduct.get({productID: $scope.productID}, function (response) {

            //$("#loader").fadeOut("fast");
            $scope.productDetailData = response.data;
            console.log('product Detail Data : ' +JSON.stringify($scope.productDetailData));

        });






    }]);