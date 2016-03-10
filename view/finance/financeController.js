'use strict';

autoscityControllers.controller('financeController', ['$scope', '$window',
    function ($scope, $window) {

        $("#loader").fadeOut();


        $scope.ratetotal = 0;
        $scope.TotalRepayment = 0;
        $scope.TotalCostofCredit = 0;

        $scope.aprCalculation = function () {

            var i = $scope.interest;
            var q = $scope.month;
            var m = $scope.modi;

            var sq = Math.pow((1+(i/q)), q);
            $scope.ratetotal = sq-1;
            console.log("APR : " +JSON.stringify($scope.ratetotal));

            var cc = (($scope.ratetotal * m)* (q / 12));
            $scope.TotalCostofCredit = cc;
            console.log("CC : " +JSON.stringify($scope.TotalCostofCredit));

            var rp =  m + $scope.TotalCostofCredit;
            $scope.TotalRepayment = rp;
            console.log("RP : " +JSON.stringify($scope.TotalRepayment));
        }
    }]);