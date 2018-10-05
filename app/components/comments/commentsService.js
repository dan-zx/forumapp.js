/**
 * Comments service.
 * 
 * @param {!string} apiUrl The url to API endpoint.
 * @param {!angular.$http} $http The Angular http service.
 * @return {!Object}
 * @export
 */
function commentsService($http, apiUrl) {
    return {

        /**
         * GET Request. Retrieves a post with comments by it's id.
         * 
         * @param {!number} postId the post id.
         * @return {!Function} a promise.
         * @export
         */
        getPostWithComments: function(postId) {
            return $http.get(apiUrl + 'posts/' + postId + '?_embed=comments')
                .then(function(response) {
                    return response.data;
                });
        },

        /**
         * POST Request. Adds the given comment in the server.
         * 
         * @param {!Object} comment
         * @return {!Function} a promise.
         * @export
         */
        saveComment: function(comment) {
            return $http.post(apiUrl + 'comments', comment)
                .then(function(response) {
                    return response.data;
                });
        },

        /**
         * PUT Request. Updates the given comment in the server.
         * 
         * @param {!Object} comment
         * @return {!Function} a promise.
         * @export
         */
        updateComment: function(comment) {
            return $http.put(apiUrl + 'comments/' + comment.id, comment)
                .then(function(response) {
                    return response.data;
                });
        },

        /** 
         * DELETE Request. Deletes the given comment in the server.
         * 
         * @param {!number} commentId the comemnt id.
         * @return {!Function} a promise.
         * @export
         */
        deleteComment: function(commentId) {
            return $http.delete(apiUrl + 'comments/' + commentId)
                .then(function(response) {
                    return response.data;
                });
        }
    };
};