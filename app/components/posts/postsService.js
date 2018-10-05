/**
 * Posts service.
 * 
 * @param {!string} apiUrl The url to API endpoint.
 * @param {!angular.$http} $http The Angular http service.
 * @return {!Object}
 * @export
 */
function postsService($http, apiUrl) {
    return {

        /**
         * GET Request. Retrieves all posts.
         * 
         * @return {!Function} a promise.
         * @export
         */
        getPosts: function() {
            return $http.get(apiUrl + 'posts')
                .then(function(response) {
                    return response.data;
                });
        },

        /**
         * GET Request. Retrieves the number of comments the user has in a post.
         *
         * @param {!number} postId the post id.
         * @param {!string} email the user email.  
         * @return {!Function} a promise.
         * @export
         */
        getUserCommentsCountInPost: function(postId, email) {
            return $http.get(apiUrl + 'comments/count?postId=' + postId + '&email=' + email)
                .then(function(response) {
                    return response.data;
                });
        },

        /**
         * POST Request. Adds the given post in the server.
         * 
         * @param {!Object} post
         * @return {!Function} a promise.
         * @export
         */
        savePost: function(post) {
            return $http.post(apiUrl + 'posts', post)
                .then(function(response) {
                    return response.data;
                });
        },

        /**
         * PUT Request. Updates the given post in the server.
         * 
         * @param {!Object} post
         * @return {!Function} a promise.
         * @export
         */
        updatePost: function(post) {
            return $http.put(apiUrl + 'posts/' + post.id, post)
                .then(function(response) {
                    return response.data;
                });
        },

        /** 
         * DELETE Request. Deletes the given post in the server.
         * 
         * @param {!number} postId the post id.
         * @return {!Function} a promise.
         * @export
         */
        deletePost: function(postId) {
            return $http.delete(apiUrl + 'posts/' + postId)
                .then(function(response) {
                    return response.data;
                });
        }
    };
};