/**
 * Post Dialog Controller.
 *
 * @param {!ngMaterial.$mdDialog} $mdDialog
 * @param {!angular.locals} locals
 * @constructor
 * @ngInject
 * @export
 */
PostDialogController = function($mdDialog, locals) {

    /**
     * The post to create.
     * @export {!Object} 
     */
    this.post = {};

    /**
     * @private
     */
    this.mdDialog_ = $mdDialog;
    
    if (locals.body) {
        this.post.body = locals.body;
    } else if (locals.post) {
        this.post = locals.post;
    }
};



/**
 * Hides and resets the dialog.
 * 
 * @export
 */
PostDialogController.prototype.cancel = function() {
    this.post = {};
    this.mdDialog_.cancel();
};


/**
 * Completes the new post and sends it as response.
 * 
 * @export
 */
PostDialogController.prototype.submit = function() {
    this.mdDialog_.hide(this.post);
    this.post = {};
};