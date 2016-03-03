'use strict';
//bootstrap ng-app="myApp"
angular.element(document).ready(function () {
    angular.bootstrap(document, ['myApp']);
});
//module for myApp decide route/controller/service/directive
var autoscityApp = angular.module('myApp', ['ngRoute', 'myControllers', 'myServices', 'dndLists', 'ngCookies',]);

autoscityApp.constant('webAppConstant', 'http://52.50.66.67:8080/CarPortal/');

autoscityApp.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.when('/login', {
                templateUrl: 'view/login/login.html',
                controller: 'loginController',
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
            }).when('/home', {
                templateUrl: 'view/home/home.html',
                controller: 'homeController'
            }).when('/insertCar', {
                templateUrl: 'view/car/insertCar.html',
                controller: 'insertCarController'
            }).when('/viewCar', {
                    templateUrl: 'view/car/viewCar.html',
                    controller: 'viewCarController'
            }).when('/EditProducts', {
                templateUrl: 'view/car/EditAllProduct.html',
                controller: 'EditAllProductsController'
            }).otherwise({
                redirectTo: '/login'
            });

        }])
    .run(function ($rootScope, $location, $cookies) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            $("#loader").fadeIn();
            var userData = $cookies.getObject('userData');

            $rootScope.authenticated = false;
            if (userData) {
                $rootScope.authenticated = true;
            }
            else {
                var nextUrl = next.$$route.originalPath;

                if (nextUrl == '/login' || nextUrl == '/home') {
                }
                else {
                    $location.path("/login");
                }
            }
        });
    });

var autoscityControllers = angular.module('myControllers', []);

var autoscityServices = angular.module('myServices', ['ngResource']);
  
  
