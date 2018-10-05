/**
 * Profile directive for templating a single post.
 * 
 * @return {!angular.Directive} Directive definition object.
 * @export
 */
postDirective = function() {
    return {
        restrict: 'E',
        templateUrl: 'app/shared/post/postView.html',
        scope: {
            postModel: '=',
            showOptionsMenu: '=',
            deleteFn: '&',
            editFn: '&',
            clickCommentsFn: '&'
        }
    };
};