angular.module("app", ["ui.router", "angular.flux", "object.assign", "events"])
    .run(
    ["$rootScope", "$state", "$stateParams",
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }])
    .config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/');

        $stateProvider
            .state('list', {
                url: '/',
                templateUrl: '/src/views/list.html'
            })
            .state('editItem', {
                url: '/:todoId',
                templateUrl: '/src/views/edit.html'
            });

    }]);