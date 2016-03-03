'use strict';

autoscityControllers.controller('insertCarController', ['$scope', '$window', 'insertcar',
    function ($scope, $window, insertcar) {

        $("#loader").fadeOut();
       var images = [];

        $('body').on('change', '#image', function (e) {

            e.preventDefault();
            var formData = new FormData($(this).parents('form')[0]);
            $.ajax({
                url: 'php/uploadImages.php',
                type: 'POST',
                xhr: function () {
                    var myXhr = $.ajaxSettings.xhr();
                    return myXhr;
                },
                success: function (data) {
                    var obj = JSON.parse(data);

                    var small100 = [];
                    var small250 = [];
                    var medium500 = [];

                    if (obj.error == 0) {
                        $('#imageView').empty();
                        for (var j = 0; j < obj.count; j++) {
                            $('#imageView').append("<li><img style='max-height: 60px' src='carImages/"
                                + obj.folderName + "/" + [j + 1] + "_thumb100.jpg'/>");

                            small100.push("admin/carImages/"+ obj.folderName + "/" + [j + 1] + "_thumb100.jpg");
                            small250.push("admin/carImages/"+ obj.folderName + "/" + [j + 1] + "_thumb100.jpg");
                            medium500.push("admin/carImages/"+ obj.folderName + "/" + [j + 1] + ".jpg");
                            //images.push("admin/carImages/"+ obj.folderName + "/" + [j + 1] + "_thumb100.jpg");
                        }
                        images = {
                            "small100":small100,
                            "small250":small250,
                            "medium500":medium500
                        };
                    }
                    else {
                        $.toaster({
                            priority: 'danger',
                            title: 'Alert',
                            message: obj.message
                        });
                    }
                },
                error: function (data) {
                    $.toaster({
                        priority: 'warning',
                        title: 'Alert',
                        message: 'No Image Uploaded Please try again'
                    });
                },
                data: formData,
                cache: false,
                contentType: false,
                processData: false
            });
            return false;
        });

        $scope.inserCar = function () {
            $("#loader").fadeIn();
            insertcar.save({
                "productName": $scope.productName,
                "model": $scope.model,
                "keyFeatures": $scope.keyFeatures,
                "fuelType": $scope.fueltype,
                "engineSize": $scope.engineSize,
                "status": $scope.status,
                "miles": $scope.miles,
                "tax": $scope.tax,
                "type": $scope.type,
                "colour": $scope.colour,
                "condition": $scope.condition,
                "transmission": $scope.transmission,
                "mileage": $scope.mileage,
                "safetyFeatures": $scope.safetyFeatures,
                "driveSide": $scope.driveSide,
                "avalability": $scope.avalability,
                "vatType": $scope.vatType,
                "price": $scope.Price,
                "doors": $scope.doors,
                "previousOwners": $scope.previousOwners,
                "regMark": $scope.regMark,
                "manufacturer": $scope.manufacturer,
                "exterior": $scope.exterior,
                "metallicPaint": $scope.metallicPaint,
                "shortDescription": $scope.shortDescription,
                "warrenty": $scope.warrenty,
                "carRegistrationDate": $scope.carRegistrationDate,
                "gearType": $scope.gearType,
                "interior": $scope.interior,
                "img": images
            }, function (response) {
                $("#loader").fadeOut();
                if (response.status == 0) {
                    $.toaster("Insert Product Successfully", 'Congratulation', 'success');
                }
                else {
                    $.toaster(response.message, 'Congratulation', 'success');
                }
            }, function () {
                $("#loader").fadeOut();
                $.toaster("Connection Error", 'Alert', 'danger');
            });
            $scope.productName = "";
            $scope.model = "";
            $scope.keyFeatures = "";
            $scope.fuelType = "";
            $scope.engineSize = "";
            $scope.status = "";
            $scope.miles = "";
            $scope.tax = "";
            $scope.type = "";
            $scope.colour = "";
            $scope.condition = "";
            $scope.transmission = "";
            $scope.mileage = "";
            $scope.safetyFeatures = "";
            $scope.driveSide = "";
            $scope.avalability = "";
            $scope.vatType = "";
            $scope.price = "";
            $scope.doors = "";
            $scope.previousOwners = "";
            $scope.regMark = "";
            $scope.manufacturer = "";
            $scope.exterior = "";
            $scope.metallicPaint = "";
            $scope.shortDescription = "";
            $scope.warrenty = "";
            $scope.carRegistrationDate = "";
            $scope.gearType = "";
            $scope.interior = "";
            $scope.img = "";
        };
    }]);