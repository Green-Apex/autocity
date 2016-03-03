'use strict';

autoscityControllers.controller('carListController', ['$scope', '$window', 'getallproducts', 'getFilterByCriteria', '$location',
    function ($scope, $window, getallproducts, getFilterByCriteria, $location) {

        $("#loader").fadeOut();
        $scope.productlist = [];
        $scope.filterList = [];

        $scope.minPrice = 0;
        $scope.maxPrice = 0;


        /*$scope.criteria = "";
         $scope.endIndex = 80,
         $scope.max = "";
         $scope.min = "";
         $scope.sort = "";
         $scope.startIndex = 0;
         $scope.status = "";
         $scope.type = "car";*/

        var searchObject = $location.search();
        $scope.criteria = searchObject.criteria;
        $scope.endIndex = searchObject.endIndex;
        $scope.max = searchObject.max;
        $scope.min = searchObject.min;
        $scope.sort = searchObject.sort;
        $scope.startIndex = searchObject.startIndex;
        $scope.status = searchObject.status;
        $scope.type = searchObject.type;

        if ($scope.criteria != "") {
            var length = searchObject.criteria.length;
            var index = searchObject.criteria.indexOf(":");
            $scope.filterlist = searchObject.criteria.substring(index + 1, length);
        }

        if ($scope.min != "" && $scope.max != "") {
            $scope.maxPrice = $scope.max;
            $scope.minPrice = $scope.min;
        }


        getallproducts.get({
            criteria: $scope.criteria,
            endIndex: $scope.endIndex,
            max: $scope.max,
            min: $scope.min,
            sort: $scope.sort,
            startIndex: $scope.startIndex,
            status: $scope.status,
            type: $scope.type
        }, function (response) {
            /*angular.forEach(response.data, function (value, key) {
             $scope.productlist.push(value);
             });*/

            $scope.productlist = response.data;
        });

        getFilterByCriteria.get(function (response) {
            $scope.filterData = response.data;

            if ($scope.min != "" && $scope.max != "") {
                $scope.maxPrice = $scope.max;
                $scope.minPrice = $scope.min;
            }
            else {
                $scope.maxPrice = response.data.maxPrice;
                $scope.minPrice = response.data.minPrice;
            }
            //alert(JSON.stringify($scope.ff));
        });

        $scope.GetValue = function (value, value2) {


            //$location.search("criteria=model:"+value+"&endIndex="+$scope.endIndex+"&max="+$scope.max+"&min="+$scope.min+"&sort="+$scope.sort+"&startIndex="+$scope.startIndex+"&status="+$scope.status+"&type=");
            console.log(value);
            console.log(value2);

            if (value2) {
                $location.search("criteria=" + $scope.criteria + "&endIndex=" + $scope.endIndex + "&max=" + value2 + "&min=" + value + "&sort=" + $scope.sort + "&startIndex=" + $scope.startIndex + "&status=" + $scope.status + "&type=");
                $scope.max = value2;
                $scope.min = value;
            }
            else {
                $scope.max = "";
                $scope.min = "";
                $location.search("criteria=model:" + value + "&endIndex=" + $scope.endIndex + "&max=" + $scope.max + "&min=" + $scope.min + "&sort=" + $scope.sort + "&startIndex=" + $scope.startIndex + "&status=" + $scope.status + "&type=");

            }

            /*var a;
             var fruitId = $scope.filterlist;
             var model = "model:"
             var dd = model + fruitId;

             getallproducts.get({
             criteria: dd,
             endIndex: 100,
             max: '',
             min: '',
             sort: '',
             startIndex: 0,
             status: '',
             type: ''
             }, function (response) {

             angular.forEach(response.data, function (value, key) {
             $scope.productlist.push(value);
             });
             });*/
        }


    }]);