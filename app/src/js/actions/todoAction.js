angular.module("app").factory("TodoAction", ["todoActionsConstant", "AppDispatcher", function (todoActionsConstant, AppDispatcher) {

    var source = "LIST_ACTION";

    return  {

        /**
         * @param  {string} text
         */
        create: function (text) {
            AppDispatcher.handleViewAction(source, {
                actionType: todoActionsConstant.TODO_CREATE,
                text: text
            });
        },

        /**
         * @param  {string} id
         */
        destroy: function (id) {
            AppDispatcher.handleViewAction(source, {
                actionType: todoActionsConstant.TODO_DESTROY,
                id: id
            });
        }
    }
}]);