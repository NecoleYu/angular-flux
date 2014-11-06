(function () {
    angular.module("app").controller("Todo", TodoCtrl);

    TodoCtrl.$inject = ["TodoStore", "TodoAction", "$scope"];

    function TodoCtrl(TodoStore, TodoAction, $scope) {
        /* jshint validthis: true */
        var self = this;
        self.input = "";
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

        self.todoList = TodoStore.getAll();


        TodoStore.addChangeListener(function () {
            console.log(self.todoList);
            console.log("changed from index");
        });
    }
})();