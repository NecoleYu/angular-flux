angular.module("app").controller("TodoCtrl", ["$scope", "TodoStore", function ($scope, TodoStore) {
    $scope.title = "hi necole";
    //
    TodoStore.emitChange();

}])