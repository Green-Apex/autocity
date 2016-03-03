'use strict';

autoscityServices.factory('getallproducts', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'product/:verb', {verb: 'getallproductlist',criteria:'@criteria',endIndex:'@endIndex',
            max:'@max',min:'@min',sort:'@sort',startIndex:'@startIndex',status:'@status',type:'@type'
        }, {
            query: {method: "GET"}
        });
    }]);

autoscityServices.factory('detailProduct', ['$resource','webAppConstant',
    function($resource,webAppConstant){

        return $resource(webAppConstant + 'product/'+':verb', {verb:'getproductbyid', productID:'@productID'}, {
            query: { method: "GET"}
        });

    }]);

autoscityServices.factory('getFilterByCriteria', ['$resource','webAppConstant',
    function($resource,webAppConstant){

        return $resource(webAppConstant + 'product/'+':verb', {verb:'getfilterbycriteria'}, {
            query: { method: "GET"}
        });

    }]);

/*autoscityServices.factory('getallproduct', ['$resource', 'webAppConstant',

    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'product/:verb', {verb: 'getallproductlist',criteria:'@criteria',endIndex:'@endIndex',
            max:'@max',min:'@min',sort:'@sort',startIndex:'@startIndex',status:'@status',type:'@type'
        }, {
            query: {method: "GET"}
        });
    }]);*/

