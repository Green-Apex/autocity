'use strict';
//bootstrap ng-app="myApp"
angular.element(document).ready(function () {
    angular.bootstrap(document, ['myApp']);
});
//module for myApp decide route/controller/service/directive
var autoscityApp = angular.module('myApp', ['ngRoute', 'myControllers', 'myServices', 'dndLists']);

autoscityApp.constant('webAppConstant', 'http://arpit-pc:8080/CarPortal/');

autoscityApp.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/home', {
                templateUrl: 'view/home/home.html',
                controller: 'homeController',
                access: {
                    requiresBackground: true
                },
                resolve: {
                    // I will cause a 1 second delay
                    delay: function ($q, $timeout) {
                        var delay = $q.defer();
                        $timeout(delay.resolve, 1000);
                        return delay.promise;
                    }
                }
            }).when('/login', {
                templateUrl: 'view/login/login.html',
                controller: 'loginController'
            }).when('/carList', {
                templateUrl: 'view/cars/carList.html',
                controller: 'carListController'
            }).when('/contactUs', {
                templateUrl: 'view/contactUs/contactUs.html',
                controller: 'contactUsController'
            }).when('/finance', {
                templateUrl: 'view/finance/finance.html',
                controller: 'financeController'
            }).when('/financeDeals', {
                templateUrl: 'view/finance/financeDeals.html',
                controller: 'financeDealsController'
            }).when('/partExchange', {
                templateUrl: 'view/finance/partExchange.html',
                controller: 'partExchangeController'
            }).when('/warranty', {
                templateUrl: 'view/finance/warranty.html',
                controller: 'warrantyController'
            }).when('/renting', {
                    templateUrl: 'view/finance/renting.html',
                    controller: 'rentingController'
                })
                .when('/carDetail', {
                    templateUrl: 'view/cars/carDetail.html',
                    controller: 'carDetailController'
                })
                .when('/templateForm', {
                    templateUrl: 'view/templateForm/templateForm.html',
                    controller: 'templateFormController',
                    access: {
                        requiresBackground: false,

                    }
                }).otherwise({
                redirectTo: '/home'
            });
            //$locationProvider.html5Mode(true); //For Remove #
        }])
    .run(function ($rootScope, $location) {
        $rootScope.$on('$routeChangeStart', function (event, next) {


        });
    });


var autoscityControllers = angular.module('myControllers', []);

var autoscityServices = angular.module('myServices', ['ngResource']);
  
  
