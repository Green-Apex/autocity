'use strict';

autoscityControllers.controller('homeController', ['$scope', '$window', 'getFilterByCriteria', 'gethomepageproducts',
    function ($scope, $window, getFilterByCriteria, gethomepageproducts) {

        $("#loader").fadeOut();



        getFilterByCriteria.get(function (response) {
            $scope.filterData = response.data;
        });

        gethomepageproducts.get(function (response) {
            if (response.data == '') {
                $scope.msg = "No Feature Car";
            }
            else {
                $scope.productlist = response.data;
            }
        });
    }]);

