(function () {
    angular.module("app").controller("Todo", TodoCtrl);

    TodoCtrl.$inject = ["TodoStore", "TodoAction", "$scope"];

    function TodoCtrl(TodoStore, TodoAction, $scope) {
        /* jshint validthis: true */
        var self = this;

        self.input = "";
        self.loading = true;
        self.title = "todo list";

        self.create = function (val) {
            if (val) {
                TodoAction.create(val.trim());
            }
            self.input = "";
        };


        self.remove = function (item) {
            TodoAction.destroy(item.id);
        };

        TodoStore.getAll().then(function (v) {
            self.todoList = v;
            self.loading = false;
        }, function (e) {
            self.loading = false;
        });

        TodoStore.addChangeListener(function () {
            console.log(self.todoList);
            console.log("changed from index");
        });
    }
})();