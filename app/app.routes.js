/**
 * Route configuration.
 *
 * @param {!ngRoute.$routeProvider} $routeProvider
 * @constructor
 * @ngInject
 * @export
 */
RouteConfig = function($routeProvider) {
    $routeProvider
        .when('/posts', {
            templateUrl: 'app/components/posts/postsView.html',
            controller: 'PostsController',
            controllerAs: 'postsCtrl'
        })
        .when('/post/:postId', {
            templateUrl: 'app/components/comments/commentsView.html',
            controller: 'CommentsController',
            controllerAs: 'commentsCtrl'
        })
        .otherwise({
            redirectTo: '/posts'
        });
};