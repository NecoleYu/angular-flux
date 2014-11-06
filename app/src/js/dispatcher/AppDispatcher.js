angular.module("app").factory("AppDispatcher", ["Dispatcher", "Assign", function (Dispatcher, assign) {

    var AppDispatcher = assign(new Dispatcher(), {

        /**
         * A bridge function between the views and the dispatcher, marking the action
         * as a view action.  Another variant here could be handleServerAction.
         * @param  {object} action The data coming from the view.
         */
        handleViewAction: function (source, action) {
            this.dispatch({
                source: source,
                action: action
            });
        }

    });

    return AppDispatcher;

}]);