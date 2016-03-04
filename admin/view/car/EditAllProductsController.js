'use strict';

autoscityControllers.controller('EditAllProductsController', ['$scope', '$window', '$location', 'detailProduct', 'updateproduct',
    function ($scope, $window, $location, detailProduct, updateproduct) {

        $("#loader").fadeOut();

        var images = [];

        var searchObject = $location.search();
        $scope.productID = searchObject.productID;

        detailProduct.get({productID: $scope.productID}, function (response) {
            $("#loading").fadeOut("fast");
            $scope.productID = response.data.productID;
            $scope.productName = response.data.productName;
            $scope.model = response.data.model;
            $scope.keyFeatures = response.data.keyFeatures;
            $scope.fueltype = response.data.fuelType;
            $scope.engineSize = response.data.engineSize;
            $scope.status = response.data.status;
            $scope.miles = response.data.miles;
            $scope.tax = response.data.tax;
            $scope.type = response.data.type;
            $scope.colour = response.data.colour;
            $scope.Price = response.data.price;
            $scope.shortDescription = response.data.shortDescription;
            $scope.condition = response.data.condition;
            $scope.transmission = response.data.transmission;
            $scope.mileage = response.data.mileage;
            $scope.safetyFeatures = response.data.safetyFeatures;
            $scope.driveSide = response.data.driveSide;
            $scope.avalability = response.data.avalability;
            $scope.carRegistrationDate = response.data.carRegistrationDate;
            $scope.vatType = response.data.vatType;
            $scope.doors = response.data.doors;
            $scope.regMark = response.data.regMark;
            $scope.previousOwners = response.data.previousOwners;
            $scope.exterior = response.data.exterior;
            $scope.manufacturer = response.data.manufacturer;
            $scope.metallicPaint = response.data.metallicPaint;
            $scope.interior = response.data.interior;
            $scope.warrenty = response.data.warrenty;
            $scope.gearType = response.data.gearType;
            images = response.data.img;
        });


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
        $scope.editCar = function () {
           /* alert(JSON.stringify($scope.productID));*/
            updateproduct.save({productID: $scope.productID}, {
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
                $.toaster("Update Data Successfully", 'Congratulation', 'success');
                $window.location.href = "#/viewCar?criteria=&endIndex=5000&max=&min=&sort=&startIndex=0&status=&type="
            });
        }
    }]);
