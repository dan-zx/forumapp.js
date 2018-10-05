/**
 * Profile directive for templating a single post.
 * 
 * @return {!angular.Directive} Directive definition object.
 * @export
 */
commentDirective = function() {
    return {
        restrict: 'E',
        templateUrl: 'app/shared/comment/commentView.html',
        controller: 'CommentDirectiveController',
        controllerAs: 'ctrl',
        scope: {
            commentModel: '=',
            showOptionsMenu: '=',
            deleteFn: '&'
        }
    };
};