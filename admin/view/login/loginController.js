'use strict';

autoscityControllers.controller('loginController', ['$scope', '$window', 'login', '$cookies',
    function ($scope, $window, login, $cookies) {

        $("#loader").fadeOut();
        $scope.loginFunction = function(){
            $("#loader").fadeIn();
            login.get({email: $scope.userID, password: $scope.password},function(response){
                if(response.message == "Login successful"){
                    $("#loader").fadeOut();
                    $cookies.putObject('userData',response.data);
                    $.toaster("Login Successfully", 'Congratulation', 'success');
                    $window.location.href = "#/home"
                }
                else{
                    $("#loader").fadeOut();
                    $.toaster("Authentication Problem", 'Alert', 'warning');
                }
            },function(){
                $("#loader").fadeOut();
                $.toaster("Connection Problem ", 'Alert', 'danger');
            });
        };
       /*$scope.logout = function(){
            alert('hi');
            var userData = $cookies.getObject('userData');
            console.log('Cookies : ' +userData);
        }*/
    }]);