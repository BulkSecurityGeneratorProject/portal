(function() {
    'use strict';

    angular
        .module('portalApp')
        .controller('ContaCorrenteDialogController', ContaCorrenteDialogController);

    ContaCorrenteDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ContaCorrente'];

    function ContaCorrenteDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ContaCorrente) {
        var vm = this;

        vm.contaCorrente = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.contaCorrente.id !== null) {
                ContaCorrente.update(vm.contaCorrente, onSaveSuccess, onSaveError);
            } else {
                ContaCorrente.save(vm.contaCorrente, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('portalApp:contaCorrenteUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
