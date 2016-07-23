(function() {
    'use strict';
    angular
        .module('portalApp')
        .factory('ContaCorrente', ContaCorrente);

    ContaCorrente.$inject = ['$resource'];

    function ContaCorrente ($resource) {
        var resourceUrl =  'financeiro/' + 'api/conta-correntes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
