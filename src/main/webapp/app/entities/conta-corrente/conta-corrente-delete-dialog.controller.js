(function() {
    'use strict';

    angular
        .module('portalApp')
        .controller('ContaCorrenteDeleteController',ContaCorrenteDeleteController);

    ContaCorrenteDeleteController.$inject = ['$uibModalInstance', 'entity', 'ContaCorrente'];

    function ContaCorrenteDeleteController($uibModalInstance, entity, ContaCorrente) {
        var vm = this;

        vm.contaCorrente = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ContaCorrente.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
