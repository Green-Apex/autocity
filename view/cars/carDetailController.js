'use strict';

autoscityControllers.controller('carDetailController', ['$scope', '$window','detailProduct', '$location',
    function ($scope, $window, detailProduct, $location) {

        $("#loader").fadeOut();
        $scope.thumbImageList = [];
        $scope.originImageList = [];
        $scope.imageSetList = "";

        $scope.setImageChange = function (imageSet) {
            //alert(JSON.stringify(imageSet));
            $("#etalage").empty();
            //alert(imageSet.length);

            for (var i = 0; i < imageSet.length; i++) {
                //alert(imageSet[i].thumbnail);
                $("#etalage").append('<li><img class="etalage_thumb_image img-responsive" src="' + imageSet[i].thumbnail + '" alt="" /><img class="etalage_source_image img-responsive" src="' + imageSet[i].originalImage + '" alt="" /></li>');
            }

            $('#etalage').etalage({
                thumb_image_width: 230,
                thumb_image_height: 400,
                source_image_width: 800,
                source_image_height: 1200,
                show_hint: true,
                click_callback: function (image_anchor, instance_id) {
                    alert('Callback example:\nYou clicked on an image with the anchor: "' + image_anchor + '"\n(in Etalage instance: "' + instance_id + '")');
                }
            });
        }

        var searchObject = $location.search();
        $scope.productID = searchObject.productID;

        detailProduct.get({productID: $scope.productID}, function (response) {
            $("#loading").fadeOut("fast");

            $scope.productDetailData = response.data;

            //$("#loader").fadeOut("fast");
           /* $scope.productDetailData = response.data;
            console.log('product Detail Data : ' +JSON.stringify($scope.productDetailData));*/
        });






    }]);