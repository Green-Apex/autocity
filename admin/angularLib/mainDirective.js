autoscityApp.directive('focus', function () {
    return function (scope, element) {
        element[0].focus();
    }
});

autoscityApp.directive('deskHeader', function () {
    return {
        restrict: 'E',
        templateUrl: 'view/layout/header.html',
        controller: ['$scope', '$window',
            function ($scope, $window) {

                //$(".shortcutButton").click(function(){$(".shortcut").hasClass("hidden")? $(".shortcut").removeClass("hidden"): $(".shortcut").addClass("hidden")});
                $("#shortcutButton").click(function(){$('.shortcut').css('display') == 'none'? $('.shortcut').css('display','block'): $('.shortcut').css('display','none')});
                $("#menuButton").click(function(){$('.menubar').css('display') == 'none'? $('.menubar').css('display','block'): $('.menubar').css('display','none')});


                /* $scope.menuData = [];

                 getSession.get(function (response) {
                     if (response.userType == "user") {
                         $scope.menuData.push(
                             {
                                 title: "Profile",
                                 url: "#/userProfile"
                             },
                             {
                                 title: "Product List",
                                 url: "#/productList?searchkey=&cuisine=&ingredient=&type=&nearBy="
                             }
                         );
                     }
                     else {
                         $scope.menuData.push(
                             {
                                 title: "Home",
                                 url: "#/home"
                             },
                             {
                                 title: "Profile",
                                 url: "#/userProfile"
                             },
                             {
                                 title: "Add Event/Product",
                                 url: "#/addEditEvent"
                             }
                         );
                     }

                     $scope.firstName = response.firstName;
                 });

                 $scope.userSignout = function () {
                     $("#loader").fadeIn();
                     removeSession.get(function (response) {
                         $window.location.href = "#/login";
                         $("#loader").fadeOut();
                     });


                 }*/
            }]
    }
});

autoscityApp.directive('deskFooter', function () {
    return {
        restrict: 'E',
        templateUrl: 'view/layout/footer.html',
        controller: ['$scope', '$http',
            function ($scope, $http) {
            }]
    }
});


autoscityApp.directive('deskMenubar', function () {
    return {
        restrict: 'E',
        templateUrl: 'view/layout/menuBar.html',
        controller: ['$scope', '$window', '$cookies',
            function ($scope, $window, $cookies) {

                $scope.userData = true;

                var userData = $cookies.getObject('userData');

                if (userData) {
                    $scope.userData = false;
                }
                else {
                    $scope.userData = true;
                }

                $scope.userSignout = function(){
                    $cookies.remove('userData');
                    $window.location.href = "#/login";
                }

            }]
    }
});

