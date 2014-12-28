angular.module("app").factory("EditStore", ["AppDispatcher", "Assign", "Events", "todoActionsConstant", "todoEventsConstant", "TodoStore", function (AppDispatcher, assign, events, todoActionsConstant, todoEventsConstant, TodoStore) {


    var _todos = {};
    var CHANGE_EVENT = todoEventsConstant.EDIT_CHANGE;
    var current_source = "EDIT_ACTION";
    var EventEmitter = events.EventEmitter;

     _todos = TodoStore.getTodos();

    /**
     * edit a TODO item.
     * @param  {string} text The content of the TODO
     */
    function save(id, text) {
        _todos[id] = {
            id: id,
            complete: false,
            text: text
        };
    }

    var EditStore = assign({}, EventEmitter.prototype, {
        get: function (id) {
            
            console.log(_todos);
            return _todos[id];
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
        var text, id;

        if (payload.source == current_source) {
            switch (action.actionType) {
                case todoActionsConstant.TODO_UPDATE_TEXT:
                    text = action.text.trim();
                    id = action.id;
                    if (text !== '' && id != '') {
                        save(id, text);
                    }
                    break;
                default:
                    return true;
            }
            EditStore.emitChange();
        }
        return true;
    });


    return EditStore;

}]);

