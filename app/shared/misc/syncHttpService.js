/**
 * Synchronous HTTP Request service.
 * 
 * @return {!Object}
 * @export
 */
function synchronousHttpService() {

    var synchronousCall = function(url, method, payload) {
        var http = new XMLHttpRequest();
        http.open(method, url, false);
        if (payload == null) http.send();
        else http.send(payload);
        return JSON.parse(http.responseText);
    };

    return {

        /**
         * Synchronous GET request.
         * 
         * @param {!string} url The url to send the request.
         * @return {!Function}
         * @export
         */
        get: function(url) {
            return synchronousCall(url, 'GET', null);
        },

        /**
         * Synchronous POST request.
         * 
         * @param {!string} url The url to send the request.
         * @param {Object} payload the data to send.
         * @return {!Function}
         * @export
         */
        post: function(url, payload) {
            return synchronousCall(url, 'POST', payload);
        },

        /**
         * Synchronous PUT request.
         * 
         * @param {!string} url The url to send the request.
         * @param {Object} payload the data to send.
         * @return {!Function}
         * @export
         */
        put: function(url, payload) {
            return synchronousCall(url, 'PUT', payload);
        },

        /**
         * Synchronous DELETE request.
         * 
         * @param {!string} url The url to send the request.
         * @return {!Function}
         * @export
         */
        delete: function(url) {
            return synchronousCall(url, 'DELETE', null);
        },

        /**
         * Synchronous request.
         * 
         * @param {!string} url The url to send the request.
         * @param {!string} method 'GET', 'HEAD', 'POST', 'PUT', 'DELETE', 'TRACE', 'OPTIONS', 'CONNECT' or 'PATCH'.
         * @param {Object} payload the data to send.
         * @return {!Function}
         * @export
         */
        request: synchronousCall
    };
};