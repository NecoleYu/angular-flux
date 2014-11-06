angular.module("app").factory("EditAction", ["todoActionsConstant", "AppDispatcher", function (todoActionsConstant, AppDispatcher) {

    var source = "EDIT_ACTION";

    return  {

        /**
         * @param  {string} text
         */
        save: function (id, text) {
            AppDispatcher.handleViewAction(source, {
                actionType: todoActionsConstant.TODO_UPDATE_TEXT,
                text: text,
                id: id
            });
        }
    }
}]);