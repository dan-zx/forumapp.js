/**
 * Comment directive controller.
 *
 * @param {!angular.$scope} $scope
 * @constructor
 * @ngInject
 * @export
 */
CommentDirectiveController = function($scope, keyCodes) {

    /**
     * @private
     */
    this.scope_ = $scope;

    /**
     * @private
     */
    this.keyCodes_ = keyCodes;

    /**
     * False when the comment is read only, otherwise true.
     * @export {!boolean}
     */
    this.editMode = false;

    /**
     * Editable comment content.
     * @export {!Object}
     */
    this.editableComment = {};
};



/**
 * Handles keypress events.
 * 
 * @param {!angular.$event} $event the keypress event.
 * @export
 */
CommentDirectiveController.prototype.onKeyPress = function($event) {
    if ($event.keyCode == this.keyCodes_['enter']) {
        this.submitCommentChanges_();
    } else if ($event.keyCode == this.keyCodes_['esc']) {
        this.cancelEditMode_();
    }
};


/**
 * Edition mode is on and editable is a clone from the model.
 *  
 * @export
 */
CommentDirectiveController.prototype.editComment = function() {
    this.editableComment = angular.copy(this.scope_.commentModel);
    this.editMode = true;
};


/**
 * Submits the comment body change to the server an the updates the view.
 * 
 * @private 
 */
CommentDirectiveController.prototype.submitCommentChanges_ = function() {
    this.scope_.$emit('commentUpdated', this.editableComment);
    this.cancelEditMode_();
};


/**
 * Cancels edition and resets the editable comment.
 * 
 * @private
 */
CommentDirectiveController.prototype.cancelEditMode_ = function() {
    this.editMode = false;
    this.editableComment = {};
};