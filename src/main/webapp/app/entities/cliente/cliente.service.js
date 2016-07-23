(function() {
    'use strict';
    angular
        .module('portalApp')
        .factory('Cliente', Cliente);

    Cliente.$inject = ['$resource', 'DateUtils'];

    function Cliente ($resource, DateUtils) {
        var resourceUrl =  'financeiro/' + 'api/clientes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.dataNascimento = DateUtils.convertLocalDateFromServer(data.dataNascimento);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.dataNascimento = DateUtils.convertLocalDateToServer(data.dataNascimento);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.dataNascimento = DateUtils.convertLocalDateToServer(data.dataNascimento);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
