'use strict';

autoscityControllers.controller('homeController', ['$scope', '$window', 'getFilterByCriteria',
    function ($scope, $window, getFilterByCriteria ) {

        $("#loader").fadeOut();

        getFilterByCriteria.get(function (response) {
            $scope.filterData = response.data;
        });
    }]);

