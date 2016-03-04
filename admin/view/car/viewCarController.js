'use strict';

autoscityControllers.controller('viewCarController', ['$scope', '$window', 'getallproducts', '$location', 'deleteproduct',
    function ($scope, $window, getallproducts, $location, deleteproduct) {

        $("#loader").fadeOut();

        $scope.productlist = [];

        var searchObject = $location.search();
        $scope.criteria = searchObject.criteria;
        $scope.endIndex = searchObject.endIndex;
        $scope.max = searchObject.max;
        $scope.min = searchObject.min;
        $scope.sort = searchObject.sort;
        $scope.startIndex = searchObject.startIndex;
        $scope.status = searchObject.status;
        $scope.type = searchObject.type;

        getallproducts.get({
            criteria:$scope.criteria,
            endIndex:$scope.endIndex,
            max:$scope.max,
            min:$scope.min,
            sort:$scope.sort,
            startIndex:$scope.startIndex,
            status:$scope.status,
            type:$scope.type
        }, function (response) {
            angular.forEach(response.data, function (value, key) {
                $scope.productlist.push(value);
            });
        });

        $scope.removeProduc = function (index) {
            $("#loader").fadeIn();
            deleteproduct.save({productID: index}, function (response) {
                    $("#loader").fadeOut();
                $.toaster("Deleted Data Successfully", 'Congratulation', 'success');
                $window.location.href = "#/viewCar?criteria=&endIndex=5000&max=&min=&sort=&startIndex=0&status=&type="
            })
        };
    }]);