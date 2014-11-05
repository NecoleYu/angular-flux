angular.module("app").factory("AppDispatcher", ["Dispatcher", "Assign", function (Dispatcher, assign) {

    var AppDispatcher = assign(new Dispatcher(), {

        /**
         * A bridge function between the views and the dispatcher, marking the action
         * as a view action.  Another variant here could be handleServerAction.
         * @param  {object} action The data coming from the view.
         */
        handleViewAction: function (action) {
            debugger;
            this.dispatch({
                source: 'VIEW_ACTION',
                action: action
            });
        }

    });

    return AppDispatcher;

}]);