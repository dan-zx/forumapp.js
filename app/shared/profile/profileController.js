/**
 * Profile controller
 *
 * @param {!Object} sharedObjectsService
 * @param {!angular.$scope} $scope
 * @constructor
 * @ngInject
 * @export
 */
ProfileController = function($scope, sharedObjectsService) {

    /**
     * The user currently logged in.
     * @export {!Object} 
     */
    this.user = sharedObjectsService.currentUser;

    // Listens when someone adds a new post
    $scope.$on('addedPost', function() {
    	this.user.numOfPosts++;
    }.bind(this));

    // Listens when someone deletes a post
    $scope.$on('deletedPost', function(event, numOfCommentsDeleted) {
    	this.user.numOfPosts--;
        this.user.numOfComments -= numOfCommentsDeleted;
    }.bind(this));

    // Listens when someone adds a new comment
    $scope.$on('addedComment', function() {
    	this.user.numOfComments++;
    }.bind(this));

    // Listens when someone deletes a comment
    $scope.$on('deletedComment', function() {
    	this.user.numOfComments--;
    }.bind(this));
};