(function() {
    'use strict';

    angular
        .module('portalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('conta-corrente', {
            parent: 'entity',
            url: '/conta-corrente?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'portalApp.contaCorrente.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/conta-corrente/conta-correntes.html',
                    controller: 'ContaCorrenteController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('contaCorrente');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('conta-corrente-detail', {
            parent: 'entity',
            url: '/conta-corrente/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'portalApp.contaCorrente.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/conta-corrente/conta-corrente-detail.html',
                    controller: 'ContaCorrenteDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('contaCorrente');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ContaCorrente', function($stateParams, ContaCorrente) {
                    return ContaCorrente.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'conta-corrente',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('conta-corrente-detail.edit', {
            parent: 'conta-corrente-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/conta-corrente/conta-corrente-dialog.html',
                    controller: 'ContaCorrenteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ContaCorrente', function(ContaCorrente) {
                            return ContaCorrente.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('conta-corrente.new', {
            parent: 'conta-corrente',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/conta-corrente/conta-corrente-dialog.html',
                    controller: 'ContaCorrenteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                codigo: null,
                                saldo: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('conta-corrente', null, { reload: true });
                }, function() {
                    $state.go('conta-corrente');
                });
            }]
        })
        .state('conta-corrente.edit', {
            parent: 'conta-corrente',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/conta-corrente/conta-corrente-dialog.html',
                    controller: 'ContaCorrenteDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ContaCorrente', function(ContaCorrente) {
                            return ContaCorrente.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('conta-corrente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('conta-corrente.delete', {
            parent: 'conta-corrente',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/conta-corrente/conta-corrente-delete-dialog.html',
                    controller: 'ContaCorrenteDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ContaCorrente', function(ContaCorrente) {
                            return ContaCorrente.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('conta-corrente', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
