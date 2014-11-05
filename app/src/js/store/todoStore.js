angular.module("app").factory("TodoStore", ["AppDispatcher", "Assign", "Events", "TodoAction", function (AppDispatcher, assign, events, TodoAction) {

    debugger;

    var _todos = {};
    var CHANGE_EVENT = 'change';
    var EventEmitter = events.EventEmitter;


    function create(text) {
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        _todos[id] = {
            id: id,
            complete: false,
            text: text
        };
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
            case appAction.TODO_CREATE:
                text = action.text.trim();
                if (text !== '') {
                    create(text);
                }
                break;
            default:
                return true;
        }
    });


    return TodoStore;

}]);

