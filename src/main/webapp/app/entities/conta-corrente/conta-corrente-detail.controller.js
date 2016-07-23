(function() {
    'use strict';

    angular
        .module('portalApp')
        .controller('ContaCorrenteDetailController', ContaCorrenteDetailController);

    ContaCorrenteDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ContaCorrente'];

    function ContaCorrenteDetailController($scope, $rootScope, $stateParams, previousState, entity, ContaCorrente) {
        var vm = this;

        vm.contaCorrente = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('portalApp:contaCorrenteUpdate', function(event, result) {
            vm.contaCorrente = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
