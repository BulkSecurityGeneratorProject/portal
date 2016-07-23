(function() {
    'use strict';

    angular
        .module('portalApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('movimentacao', {
            parent: 'entity',
            url: '/movimentacao?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'portalApp.movimentacao.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/movimentacao/movimentacaos.html',
                    controller: 'MovimentacaoController',
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
                    $translatePartialLoader.addPart('movimentacao');
                    $translatePartialLoader.addPart('');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('movimentacao-detail', {
            parent: 'entity',
            url: '/movimentacao/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'portalApp.movimentacao.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/movimentacao/movimentacao-detail.html',
                    controller: 'MovimentacaoDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('movimentacao');
                    $translatePartialLoader.addPart('');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Movimentacao', function($stateParams, Movimentacao) {
                    return Movimentacao.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'movimentacao',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('movimentacao-detail.edit', {
            parent: 'movimentacao-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/movimentacao/movimentacao-dialog.html',
                    controller: 'MovimentacaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Movimentacao', function(Movimentacao) {
                            return Movimentacao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('movimentacao.new', {
            parent: 'movimentacao',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/movimentacao/movimentacao-dialog.html',
                    controller: 'MovimentacaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                valor: null,
                                tipo: null,
                                data: null,
                                contaCorrente: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('movimentacao', null, { reload: true });
                }, function() {
                    $state.go('movimentacao');
                });
            }]
        })
        .state('movimentacao.edit', {
            parent: 'movimentacao',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/movimentacao/movimentacao-dialog.html',
                    controller: 'MovimentacaoDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Movimentacao', function(Movimentacao) {
                            return Movimentacao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('movimentacao', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('movimentacao.delete', {
            parent: 'movimentacao',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/movimentacao/movimentacao-delete-dialog.html',
                    controller: 'MovimentacaoDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Movimentacao', function(Movimentacao) {
                            return Movimentacao.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('movimentacao', null, { reload: true });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
