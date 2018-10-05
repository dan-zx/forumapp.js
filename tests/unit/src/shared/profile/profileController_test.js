describe('ProfileController', function() {

    var scope, ctrl;
    var NUM_OF_MY_COMMENTS_IN_POST = 4;
    var MOCK_USER = {
        'id': 1,
        'name': 'Daniel Pedraza',
        'username': 'Daniel',
        'email': 'Daniel_Pedraza@github.com',
        'phone': '+1 123 123-12-12 #12345',
        'website': 'github.com',
        'company': 'GitHub',
        'numOfPosts': 2,
        'numOfComments': 5
    };

    beforeEach(function() {
        module('ngRoute');
        module('ngMaterial');
        module('forumApp');
        module(function($provide) {
            $provide.value('httpSync', {
                get: function(unused) {
                    return MOCK_USER;
                }
            });
        });

        inject(function($rootScope, $controller, sharedObjectsService) {
            scope = $rootScope.$new();
            ctrl = $controller('ProfileController', {$scope: scope, sharedObjectsService: sharedObjectsService});
        })
    });

    it('should have user defined', function() {
        expect(ctrl.user).toBeDefined();
        expect(ctrl.user).toEqual(MOCK_USER);
    });

    it('should increase user post count by 1 when "addedPost" event', function() {
        var numOfPostsBeforeEvent = ctrl.user.numOfPosts;
        scope.$broadcast('addedPost');

        expect(ctrl.user.numOfPosts).toEqual(numOfPostsBeforeEvent + 1);
    });

    it('should decrement user post count by 1 and comment count by ' + NUM_OF_MY_COMMENTS_IN_POST + ' when "deletedPost" event', function() {
        var numOfPostsBeforeEvent = ctrl.user.numOfPosts;
        var numOfCommentsBeforeEvent = ctrl.user.numOfComments;
        scope.$broadcast('deletedPost', NUM_OF_MY_COMMENTS_IN_POST);

        expect(ctrl.user.numOfPosts).toEqual(numOfPostsBeforeEvent - 1);
        expect(ctrl.user.numOfComments).toEqual(numOfCommentsBeforeEvent - NUM_OF_MY_COMMENTS_IN_POST);
    });

    it('should increase user comment count by 1 when "addedComment" event', function() {
        var numOfCommentsBeforeEvent = ctrl.user.numOfComments;
        scope.$broadcast('addedComment');

        expect(ctrl.user.numOfComments).toEqual(numOfCommentsBeforeEvent + 1);
    });

    it('should decrement user comment count by 1 when "deletedComment" event', function() {
        var numOfCommentsBeforeEvent = ctrl.user.numOfComments;
        scope.$broadcast('deletedComment');

        expect(ctrl.user.numOfComments).toEqual(numOfCommentsBeforeEvent - 1);
    });
});