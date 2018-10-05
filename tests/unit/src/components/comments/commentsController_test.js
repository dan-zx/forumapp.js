describe('CommentsController', function() {

    var scope, httpBackend, ctrl;
    var OK_STATUS = 200;
    var EMPTY_COMMENT = {body: ''};
    var SUCCESS_OBJ = {successful: true};
    var USER_MOCK = {
        id: 1,
        name: 'Daniel Pedraza',
        username: 'Daniel',
        email: 'Daniel_Pedraza@github.com',
        phone: '+1 123 123-12-12 #12345',
        website: 'github.com',
        company: 'GitHub',
        numOfPosts: 2,
        numOfComments: 5
    };
    var POST_MOCK = {
        id: 1,
        userId: 1,
        title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
        body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        userFullName: 'Daniel Pedraza',
        comments: [
            {
                id: 1,
                postId: 1,
                name: 'id labore ex et quam laborum',
                email: 'Daniel_Pedraza@github.com',
                body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
            },
            {
                id: 2,
                postId: 1,
                name: 'quo vero reiciendis velit similique earum',
                email: 'Eddie_Lozada@github.com',
                body: 'est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et'
            }
        ]
    };

    beforeEach(function() {
        module('ngRoute');
        module('ngMaterial');
        module('forumApp');
        module(function($provide) {
            $provide.value('httpSync', {
                get: function(unused) {
                    return USER_MOCK;
                }
            });
        });

        inject(function($rootScope, $controller, $httpBackend, commentsService, sharedObjectsService) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            spyOn(scope, '$emit');
            httpBackend.whenGET(new RegExp('posts\\/' + POST_MOCK.id + '\\?_embed=comments$')).respond(OK_STATUS, POST_MOCK);
            ctrl = $controller('CommentsController', {$scope: scope, $routeParams: {postId: POST_MOCK.id}, commentsService: commentsService, sharedObjectsService: sharedObjectsService});
            httpBackend.flush();
        });
    });

    it('should have user and post defined', function() {
        expect(ctrl.currentUser).toBeDefined();
        expect(ctrl.currentUser).toEqual(USER_MOCK);
        expect(ctrl.post).toBeDefined();
        var postInCtrl = angular.copy(POST_MOCK);
        postInCtrl.numOfComments = POST_MOCK.comments.length;
        expect(ctrl.post).toEqual(postInCtrl);
    });

    it('should listen for "filterChange" event and update the filter', function() {
        expect(ctrl.filter).toEqual('');
        scope.$broadcast('filterChange', 'Something');
        expect(ctrl.filter).toEqual('Something');
    });

    it('should add a comment in the server, to the post comments array and emit "addedComment" event', function() {
        var commentToAdd = {
            postId: 1,
            name: 'Comment by Daniel_Pedraza@github.com',
            email: 'Daniel_Pedraza@github.com',
            body: 'maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor'
        };
        var commentMockResponse = angular.copy(commentToAdd);
        commentMockResponse.id = 6;
        var prevCount = ctrl.post.numOfComments;
        ctrl.newComment = commentToAdd;
        httpBackend.whenPOST(/comments$/).respond(OK_STATUS, commentMockResponse);
        ctrl.addComment();
        httpBackend.flush();
        var lastComment = ctrl.post.comments[ctrl.post.comments.length - 1];
        expect(commentMockResponse).toEqual(lastComment);
        expect(ctrl.post.numOfComments).toEqual(prevCount + 1);
        expect(ctrl.post.numOfComments).toEqual(ctrl.post.comments.length);
        expect(ctrl.newComment).toEqual(EMPTY_COMMENT);
        expect(scope.$emit).toHaveBeenCalledWith('addedComment');
    });

    it('should delete a comment in the server, in the post comments array and emit "deletedComment" event', function() {
        var commentToDelete = ctrl.post.comments[0];
        var prevCount = ctrl.post.numOfComments;
        httpBackend.whenDELETE(new RegExp('comments\\/' + commentToDelete.id + '$')).respond(OK_STATUS, SUCCESS_OBJ);
        ctrl.deleteComment(commentToDelete);
        httpBackend.flush();
        expect(ctrl.post.comments.indexOf(commentToDelete)).toEqual(-1);
        expect(ctrl.post.numOfComments).toEqual(prevCount - 1);
        expect(ctrl.post.numOfComments).toEqual(ctrl.post.comments.length);
        expect(scope.$emit).toHaveBeenCalledWith('deletedComment');
    });
});