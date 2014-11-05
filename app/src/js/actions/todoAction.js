angular.module("app").factory("TodoAction", ["todoConstants", "AppDispatcher", function (todoConstants, AppDispatcher) {

    return  {

        /**
         * @param  {string} text
         */
        create: function (text) {
            AppDispatcher.handleViewAction({
                actionType: todoConstants.TODO_CREATE,
                text: text
            });
        },

        /**
         * @param  {string} id
         */
        destroy: function (id) {
            AppDispatcher.handleViewAction({
                actionType: todoConstants.TODO_DESTROY,
                id: id
            });
        }
    }
}]);