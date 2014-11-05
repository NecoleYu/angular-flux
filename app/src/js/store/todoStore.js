angular.module("app").factory("TodoStore", ["AppDispatcher", "Assign", "Events", "todoConstants", function (AppDispatcher, assign, events, todoConstants) {


    var _todos = {};
    var CHANGE_EVENT = 'change';
    var EventEmitter = events.EventEmitter;

    /**
     * Create a TODO item.
     * @param  {string} text The content of the TODO
     */
    function create(text) {
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        _todos[id] = {
            id: id,
            complete: false,
            text: text
        };
    }

    /**
     * Delete a TODO item.
     * @param  {string} id
     */
    function destroy(id) {
        delete _todos[id];
    }

    var TodoStore = assign({}, EventEmitter.prototype, {

        getAll: function () {
            return _todos;
        },

        emitChange: function () {
            this.emit(CHANGE_EVENT);
        },

        addChangeListener: function (callback) {
            this.on(CHANGE_EVENT, callback);
        },

        removeChangeListener: function (callback) {
            this.removeListener(CHANGE_EVENT, callback);
        }
    });

    AppDispatcher.register(function (payload) {
        var action = payload.action;
        var text;

        switch (action.actionType) {
            case todoConstants.TODO_CREATE:
                text = action.text.trim();
                if (text !== '') {
                    create(text);
                }
                break;
            case todoConstants.TODO_DESTROY:
                destroy(action.id);
                break;
            default:
                return true;
        }
        TodoStore.emitChange();
        return true;
    });


    return TodoStore;

}]);

