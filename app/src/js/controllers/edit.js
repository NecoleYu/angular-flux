(function () {
    angular.module("app").controller("Edit", EditCtrl);

    EditCtrl.$inject = ["EditStore", "EditAction", "$stateParams","$state"];

    function EditCtrl(EditStore, EditAction, $stateParams, $state) {
        /* jshint validthis: true */
        var self = this,
            id = $stateParams.todoId;

        var item = EditStore.get(id);
        self.text = item.text;
        self.save = function (val) {
            if (val) {
                EditAction.save(id, val.trim());
            }
            $state.go('list', $stateParams);
        };

        EditStore.addChangeListener(function () {
            console.log("changed from edit");
        });
    }
})();