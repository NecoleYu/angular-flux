angular.module("angular.flux", []).factory("Dispatcher", function () {
    var _lastID = 1;
    var _prefix = 'ID_';
    var __DEV__ = true;

    var invariant = function (condition, format, a, b, c, d, e, f) {
        if (__DEV__) {
            if (format === undefined) {
                throw new Error('invariant requires an error message argument');
            }
        }

        if (!condition) {
            var error;
            if (format === undefined) {
                error = new Error(
                        'Minified exception occurred; use the non-minified dev environment ' +
                        'for the full error message and additional helpful warnings.'
                );
            } else {
                var args = [a, b, c, d, e, f];
                var argIndex = 0;
                error = new Error(
                        'Invariant Violation: ' +
                        format.replace(/%s/g, function () {
                            return args[argIndex++];
                        })
                );
            }

            error.framesToPop = 1; // we don't care about invariant's own frame
            throw error;
        }
    };

    function Dispatcher() {
        this._callbacks = {};
        this._isPending = {};
        this._isHandled = {};
        this._isDispatching = false;
        this._pendingPayload = null;
    }

    /**
     * Registers a callback to be invoked with every dispatched payload. Returns
     * a token that can be used with `waitFor()`.
     *
     * @param {function} callback
     * @return {string}
     */
    Dispatcher.prototype.register = function (callback) {
        var id = _prefix + _lastID++;
        this._callbacks[id] = callback;
        return id;
    }

    /**
     * Removes a callback based on its token.
     *
     * @param {string} id
     */
    Dispatcher.prototype.unregister = function (id) {
        invariant(
            this._callbacks[id],
            'Dispatcher.unregister(...): `%s` does not map to a registered callback.',
            id
        );
        delete this._callbacks[id];
    }

    /**
     * Waits for the callbacks specified to be invoked before continuing execution
     * of the current callback. This method should only be used by a callback in
     * response to a dispatched payload.
     *
     * @param {array<string>} ids
     */
    Dispatcher.prototype.waitFor = function (ids) {
        invariant(
            this._isDispatching,
            'Dispatcher.waitFor(...): Must be invoked while dispatching.'
        );
        for (var ii = 0; ii < ids.length; ii++) {
            var id = ids[ii];
            if (this._isPending[id]) {
                invariant(
                    this._isHandled[id],
                        'Dispatcher.waitFor(...): Circular dependency detected while ' +
                        'waiting for `%s`.',
                    id
                );
                continue;
            }
            invariant(
                this._callbacks[id],
                'Dispatcher.waitFor(...): `%s` does not map to a registered callback.',
                id
            );
            this._invokeCallback(id);
        }
    }

    /**
     * Dispatches a payload to all registered callbacks.
     *
     * @param {object} payload
     */
    Dispatcher.prototype.dispatch = function (payload) {
        invariant(
            !this._isDispatching,
            'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.'
        );
        this._startDispatching(payload);
        try {
            for (var id in this._callbacks) {
                if (this._isPending[id]) {
                    continue;
                }
                this._invokeCallback(id);
            }
        } finally {
            this._stopDispatching();
        }
    }

    /**
     * Is this Dispatcher currently dispatching.
     *
     * @return {boolean}
     */
    Dispatcher.prototype.isDispatching = function () {
        return this._isDispatching;
    }

    /**
     * Call the callback stored with the given id. Also do some internal
     * bookkeeping.
     *
     * @param {string} id
     * @internal
     */
    Dispatcher.prototype._invokeCallback = function (id) {
        this._isPending[id] = true;
        this._callbacks[id](this._pendingPayload);
        this._isHandled[id] = true;
    }

    /**
     * Set up bookkeeping needed when dispatching.
     *
     * @param {object} payload
     * @internal
     */
    Dispatcher.prototype._startDispatching = function (payload) {
        for (var id in this._callbacks) {
            this._isPending[id] = false;
            this._isHandled[id] = false;
        }
        this._pendingPayload = payload;
        this._isDispatching = true;
    }

    /**
     * Clear bookkeeping used for dispatching.
     *
     * @internal
     */
    Dispatcher.prototype._stopDispatching = function () {
        this._pendingPayload = null;
        this._isDispatching = false;
    }

    return Dispatcher;
});