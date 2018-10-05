/**
 * Shared objects service.
 *
 * @param {!Object} httpSync a synchronous HTTP Request service.
 * @param {!string} apiUrl The url to API endpoint.
 * @return {!Object}
 * @export
 */
function sharedObjectsService(httpSync, apiUrl) {

    var user1 = httpSync.get(apiUrl + 'users/1');

    return {
        /**
         * The currently logged user.
         * @export {!Object}
         */
        currentUser: user1
    }
};
