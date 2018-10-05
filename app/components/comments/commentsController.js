/**
 * Post's comments controller.
 *
 * @param {!Object} commentsService
 * @param {!Object} sharedObjectsService
 * @param {!angular.$scope} $scope
 * @param {!ngRoute.$routeParams} $routeParams
 * @constructor
 * @ngInject
 * @export
 */
CommentsController = function($scope, $routeParams, commentsService, sharedObjectsService) {

    /**
     * The user currently logged in.
     * @export {!Object} 
     */
    this.currentUser = sharedObjectsService.currentUser;

    /**
     * The post to show.
     * @export {!Object} 
     */
    this.post = {};

    /**
     * The comment to create.
     * @export {!Object} 
     */
    this.newComment = {};

    /**
     * Comments filter.
     * @export {!string}
     */
    this.filter = '';

    /**
     * @private
     */
    this.scope_ = $scope;

    /**
     * @private
     */
    this.commentsService_ = commentsService;

    // Preloads the post with comments.
    this.commentsService_.getPostWithComments($routeParams.postId)
        .then(function(data) {
            this.post = data;
            this.post.numOfComments = this.post.comments.length;
        }.bind(this));

    // Listens for the comment updates
    this.scope_.$on('commentUpdated', function(event, updatedComment) {
        this.updateComment_(updatedComment);
    }.bind(this));
    
    // When 'filterChange' event update the filter
    this.scope_.$on('filterChange', function(event, value) {
        this.filter = value;
    }.bind(this));
};



/**
 * Deletes a comment in the server and from the post comments array..
 * 
 * @param {!Object} comment
 * @export
 */
CommentsController.prototype.deleteComment = function(comment) {
    this.commentsService_.deleteComment(comment.id)
        .then(function(data) {
            if (data.successful) {
                var i = this.post.comments.indexOf(comment);
                this.post.comments.splice(i, 1);
                this.post.numOfComments--;
                this.scope_.$emit('deletedComment');
            }
        }.bind(this));
};


/**
 * Adds a new comment to the post, in the server and resets the new comment.
 * 
 * @export
 */
CommentsController.prototype.addComment = function() {
    var commentToSubmit = this.newComment; 
    commentToSubmit.name = 'Comment by ' + this.currentUser.email;
    commentToSubmit.email = this.currentUser.email;
    commentToSubmit.postId = this.post.id;
    this.commentsService_.saveComment(commentToSubmit)
        .then(function(updatedComment) {
            this.post.comments.push(updatedComment);
            this.post.numOfComments++;
            this.scope_.$emit('addedComment');
        }.bind(this));
    this.newComment = {};
    this.newComment.body = '';
};


/**
 * Updates a comment in post array and in the server.
 * 
 * @param {!Object} updatedComment the comment to be updated.
 * @private
 */
CommentsController.prototype.updateComment_ = function(updatedComment) {
    this.commentsService_.updateComment(updatedComment)
        .then(function(data) {
            for (var i in this.post.comments) {
                if (this.post.comments[i].id == data.id) {
                    this.post.comments[i].body = data.body;
                    break;
                }
            }
        }.bind(this));
};