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
            $scope.productDetailData = response.data;
            var shortDescription = response.data.shortDescription;
            $("#shortDescription").append('<tr><td class="font-bold text-left" style="width: 200px">shortDescription</td><td class="text-left">'+response.data.shortDescription+'</td></tr>');
            $("#keyFeature").append('<tr><td class="text-left">'+response.data.keyFeature+'</td></tr>');
            $("#technicalFeature").append(response.data.technicalFeature);
            $scope.colourSetList = response.data.img;



            for (var i = 0; i < $scope.colourSetList.small100.length; i++) {
                $("#etalage").append('<li><img class="etalage_thumb_image" src="' + $scope.colourSetList.small100[i] + '" alt="" /><img class="etalage_source_image" src="' + $scope.colourSetList.small100[i] + '" alt="" /></li>');
            }
            $('#etalage').etalage({
                thumb_image_width: 200,
                thumb_image_height: 350,
                source_image_width: 330,
                source_image_height: 600,
                show_hint: true,
                click_callback: function (image_anchor, instance_id) {
                    alert('Callback example:\nYou clicked on an image with the anchor: "' + image_anchor + '"\n(in Etalage instance: "' + instance_id + '")');
                }
            });
            //$("#loader").fadeOut("fast");
            /* $scope.productDetailData = response.data;
             console.log('product Detail Data : ' +JSON.stringify($scope.productDetailData));*/
        });






    }]);