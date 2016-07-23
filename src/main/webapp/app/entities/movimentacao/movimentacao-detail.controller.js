(function() {
    'use strict';

    angular
        .module('portalApp')
        .controller('MovimentacaoDetailController', MovimentacaoDetailController);

    MovimentacaoDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Movimentacao'];

    function MovimentacaoDetailController($scope, $rootScope, $stateParams, previousState, entity, Movimentacao) {
        var vm = this;

        vm.movimentacao = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('portalApp:movimentacaoUpdate', function(event, result) {
            vm.movimentacao = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
