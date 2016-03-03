'use strict';

autoscityServices.factory('login', ['$resource','webAppConstant',
    function($resource,webAppConstant){

        return $resource(webAppConstant + 'user/:verb', {verb:'auth', email:'@email',password:'@password'}, {
            query: { method: "GET"}
        });

    }]);

autoscityServices.factory('insertcar', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'product/:verb', {verb: 'insertproduct'}, {
            query: {method: "POST"}
        });
    }]);

autoscityServices.factory('getallproducts', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'product/:verb', {verb: 'getallproductlist',criteria:'@criteria',endIndex:'@endIndex',
            max:'@max',min:'@min',sort:'@sort',startIndex:'@startIndex',status:'@status',type:'@type'
        }, {
            query: {method: "GET"}
        });
    }]);

autoscityServices.factory('deleteproduct', ['$resource', 'webAppConstant',
    function ($resource, webAppConstant) {
        return $resource(webAppConstant + 'product/:verb', {verb: 'deleteproduct', productID:'@productID'}, {
            query: {method: "Post"}
        });
    }]);