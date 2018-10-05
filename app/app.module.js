var app = angular.module('forumApp', ['ngRoute', 'ngMaterial']);

/** CONTSTANTS **/
app.constant('apiUrl', 'http://localhost:8081/');
app.constant('keyCodes', { enter: 13, esc: 27 });


/** SERVICES **/
app.factory('httpSync', [synchronousHttpService]);
app.factory('commentsService', ['$http', 'apiUrl', commentsService]);
app.factory('postsService', ['$http', 'apiUrl', postsService]);
app.factory('sharedObjectsService', ['httpSync', 'apiUrl', sharedObjectsService]);

/** CONTROLLERS **/
app.controller('HeaderController', ['$scope', '$location', '$mdSidenav', HeaderController]);
app.controller('PostDialogController', ['$mdDialog', 'locals', PostDialogController]);
app.controller('CommentDirectiveController', ['$scope', 'keyCodes', CommentDirectiveController]);
app.controller('PostsController', ['$scope', '$location', '$mdDialog', 'sharedObjectsService', 'postsService', PostsController]);
app.controller('ProfileController', ['$scope', 'sharedObjectsService', ProfileController]);
app.controller('CommentsController', ['$scope', '$routeParams', 'commentsService', 'sharedObjectsService', CommentsController]);

/** DIRECTIVES **/
app.directive('comment', commentDirective);
app.directive('headerView', headerDirective);
app.directive('post', postDirective);
app.directive('profile', profileDirective);

/** CONFIGURATIONS **/
app.config(['$routeProvider', RouteConfig]);
app.config(['$mdThemingProvider', ThemeConfig]);