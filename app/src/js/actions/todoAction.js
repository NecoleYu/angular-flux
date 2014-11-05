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
         * @param  {string} id The ID of the ToDo item
         * @param  {string} text
         */
        updateText: function (id, text) {
            AppDispatcher.handleViewAction({
                actionType: todoConstants.TODO_UPDATE_TEXT,
                id: id,
                text: text
            });
        },

        /**
         * Toggle whether a single ToDo is complete
         * @param  {object} todo
         */
        toggleComplete: function (todo) {
            var id = todo.id;
            if (todo.complete) {
                AppDispatcher.handleViewAction({
                    actionType: todoConstants.TODO_UNDO_COMPLETE,
                    id: id
                });
            } else {
                AppDispatcher.handleViewAction({
                    actionType: todoConstants.TODO_COMPLETE,
                    id: id
                });
            }
        },

        /**
         * Mark all ToDos as complete
         */
        toggleCompleteAll: function () {
            AppDispatcher.handleViewAction({
                actionType: todoConstants.TODO_TOGGLE_COMPLETE_ALL
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
        },

        /**
         * Delete all the completed ToDos
         */
        destroyCompleted: function () {
            AppDispatcher.handleViewAction({
                actionType: todoConstants.TODO_DESTROY_COMPLETED
            });
        }
    }
}]);