'use strict';

autoscityControllers.controller('viewCarController', ['$scope', '$window', 'getallproducts', '$location', 'deleteproduct', 'checkforhome',
    function ($scope, $window, getallproducts, $location, deleteproduct, checkforhome) {

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
        $scope.productID = searchObject.productID;
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
                if(value.isHome == true){
                    $scope.productlist.push({
                        "productID": value.productID,
                        "productName": value.productName,
                        "model": value.model,
                        "fuelType": value.fuelType,
                        "engineSize": value.engineSize,
                        "colour": value.colour,
                        "avalability": value.avalability,
                        "price": value.price,
                        "isHome": false,
                        "visible": "Show"
                    });
                }
                else{
                    $scope.productlist.push({
                        "productID": value.productID,
                        "productName": value.productName,
                        "model": value.model,
                        "fuelType": value.fuelType,
                        "engineSize": value.engineSize,
                        "colour": value.colour,
                        "avalability": value.avalability,
                        "price": value.price,
                        "isHome": false,
                        "visible": "Hide"
                    });
                }

            });
        });

        deleteproduct.save({productID: $scope.productID}, function (response) {
            $.toaster("Deleted Data Successfully", 'Congratulation', 'success');
            $window.location.href = "#/viewCar?criteria=&endIndex=5000&max=&min=&sort=&startIndex=0&status=&type="
        });

        $scope.futureCar = function (productID,visible){
            var falg = $scope.productlist;
            $scope.productlist = [];
            if(visible == 'Hide'){
                angular.forEach(falg, function (value, key) {
                    if(value.productID == productID){
                        $scope.productlist.push({
                            "productID": value.productID,
                            "productName": value.productName,
                            "model": value.model,
                            "fuelType": value.fuelType,
                            "engineSize": value.engineSize,
                            "colour": value.colour,
                            "avalability": value.avalability,
                            "price": value.price,
                            "isHome": true,
                            "visible": "Show"
                        });
                        checkforhome.get({productID : productID, ishome : true},function(response){

                        }, function () {

                        });
                    }
                    else{
                        $scope.productlist.push({
                            "productID": value.productID,
                            "productName": value.productName,
                            "model": value.model,
                            "fuelType": value.fuelType,
                            "engineSize": value.engineSize,
                            "colour": value.colour,
                            "avalability": value.avalability,
                            "price": value.price,
                            "isHome": value.isHome,
                            "visible": value.visible
                        });
                    }
                });

            }
            else{
                angular.forEach(falg, function (value, key) {
                    if(value.productID == productID){
                        $scope.productlist.push({
                            "productID": value.productID,
                            "productName": value.productName,
                            "model": value.model,
                            "fuelType": value.fuelType,
                            "engineSize": value.engineSize,
                            "colour": value.colour,
                            "avalability": value.avalability,
                            "price": value.price,
                            "isHome": false,
                            "visible": "Hide"
                        });
                        checkforhome.get({productID : productID, ishome : false},function(response){

                        }, function () {

                        });
                    }
                    else{
                        $scope.productlist.push({
                            "productID": value.productID,
                            "productName": value.productName,
                            "model": value.model,
                            "fuelType": value.fuelType,
                            "engineSize": value.engineSize,
                            "colour": value.colour,
                            "avalability": value.avalability,
                            "price": value.price,
                            "isHome": value.isHome,
                            "visible": value.visible
                        });
                    }
                });
            }
        }
    }]);