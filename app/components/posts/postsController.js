/**
 * Posts controller.
 * 
 * @param {!Object} sharedObjectsService
 * @param {!Object} postsService
 * @param {!angular.$scope} $scope
 * @param {!ngRoute.$location} $location
 * @param {!ngMaterial.$mdDialog} $mdDialog
 * @constructor
 * @ngInject
 * @export
 */
PostsController = function($scope, $location, $mdDialog, sharedObjectsService, postsService) {

    /**
     * Posts array.
     * @export {!Array.<!Object>} 
     */
    this.posts = [];

    /**
     * The user currently logged in.
     * @export {!Object} 
     */
    this.currentUser = sharedObjectsService.currentUser;

    /**
     * Posts filter.
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
    this.location_ = $location;

    /**
     * @private
     */
    this.mdDialog_ = $mdDialog;

    /**
     * @private
     */
    this.postsService_ = postsService;

    /**
     * @private
     */
    this.scope_.isPostDialogOpen_ = false;

    // Paste orginal behavior when the new post dialog is open
    var onpaste = this.onPaste_.bind(this);
    this.scope_.$watch('isPostDialogOpen_', function(newValue, oldValue) {
        if (newValue == true) {
            document.removeEventListener('paste', onpaste);
        } else {
            document.addEventListener('paste', onpaste);
        }
    });

    // Remove listeners and saves the filter when destroyed
    this.scope_.$on('$destroy', function() {
        document.removeEventListener('paste', onpaste);
    }.bind(this));

    // When 'filterChange' event update the filter
    this.scope_.$on('filterChange', function(event, value) {
        this.filter = value;
    }.bind(this));

    // Preloads all posts without comments.
    this.postsService_.getPosts()
        .then(function(data) {
            this.posts = data;
        }.bind(this));
};



/**
 * Deletes a post in the server and from the post array.
 * 
 * @param {!Object} post
 * @export
 */
PostsController.prototype.deletePost = function(post) {
    var numOfCommentsDeleted = 0;
    this.postsService_.getUserCommentsCountInPost(post.id, this.currentUser.email)
        .then(function(data) {
            numOfCommentsDeleted = data.numOfComments;
            return this.postsService_.deletePost(post.id);
        }.bind(this))
        .then(function(data) {
            if (data.successful) {
                var i = this.posts.indexOf(post);
                this.posts.splice(i, 1);
                this.scope_.$emit('deletedPost', numOfCommentsDeleted);
            }
        }.bind(this));
};


/**
 * Redirects to the post detail view.
 * 
 * @param {!Object} post
 * @export
 */
PostsController.prototype.viewDetail = function(post) {
    this.location_.path('/post/' + post.id);
    this.scope_.$emit('navigationChanged', true); 
};


/**
 * Shows the new post dialog and handles its events.
 * 
 * @param {ngMaterial.Event} ev dialog event.
 * @param {string} body text to be set as the content of new post.
 * @export
 */
PostsController.prototype.showNewPostDialog = function(ev, body) {
    this.scope_.isPostDialogOpen_ = true;
    this.mdDialog_.show({
        controller: 'PostDialogController',
        controllerAs: 'dialog',
        templateUrl: 'app/shared/postDialog/postDialogView.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {
            body: body
        }
    })
        .then(function(newPost) {
            newPost.userId = this.currentUser.id;
            return this.postsService_.savePost(newPost);
        }.bind(this))
        .then(function(savedPost) {
            this.posts.push(savedPost);
            this.scope_.$emit('addedPost');
        }.bind(this))
        .finally(function() {
            this.scope_.isPostDialogOpen_ = false;
        }.bind(this));
};

/**
 * Shows the edit post dialog and handles its events.
 * 
 * @param {ngMaterial.Event} ev dialog event.
 * @param {!Object} post the post to edit.
 * @export
 */
PostsController.prototype.showEditPostDialog = function(ev, post) {
    this.scope_.isPostDialogOpen_ = true;
    this.mdDialog_.show({
        controller: 'PostDialogController',
        controllerAs: 'dialog',
        templateUrl: 'app/shared/postDialog/postDialogView.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        locals: {
            post: angular.copy(post)
        }
    })
        .then(function(updatedPost) {
            return this.postsService_.updatePost(updatedPost);
        }.bind(this))
        .then(function(updatedPost) {
            post.title = updatedPost.title;
            post.body = updatedPost.body;
        }.bind(this))
        .finally(function() {
            this.scope_.isPostDialogOpen_ = false;
        }.bind(this));
}
/**
 * Pastes the clipboard data in the new post dialog. 
 * 
 * @param {!Object} event the paste event.
 * @private
 */
PostsController.prototype.onPaste_ = function(event) {
    var text = '';
    if (window.clipboardData && window.clipboardData.getData) {
        text = window.clipboardData.getData('Text');
    } else if (event.clipboardData && event.clipboardData.getData) {
        text = event.clipboardData.getData('text/plain');
    }
    this.showNewPostDialog(null, text);
};