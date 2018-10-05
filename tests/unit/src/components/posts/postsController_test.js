describe('PostsController', function() {

    var scope, httpBackend, location, mdDialog, ctrl, deferred;
    var OK_STATUS = 200;
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
    var POSTS_MOCK = [
        {
            id: 1,
            userId: 4,
            title: 'eum et est occaecati',
            body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
            userFullName: 'Estefanie Canseco',
            numOfComments: 10
        },
        {
            id: 13,
            userId: 5,
            title: 'dolorum ut in voluptas mollitia et saepe quo animi',
            body: 'Edit body',
            userFullName: 'Hector De Haro',
            numOfComments: 2
        },
        {
            id: 17,
            userId: 1,
            title: 'fugit voluptas sed molestias voluptatem provident',
            body: 'eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo',
            userFullName: 'Daniel Pedraza',
            numOfComments: 5
        }
    ];

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

        inject(function($rootScope, $controller, $httpBackend, $q, $location, $mdDialog, sharedObjectsService, postsService) {
            scope = $rootScope.$new();
            httpBackend = $httpBackend;
            location = $location;
            mdDialog = $mdDialog;
            angular.extend(mdDialog, {
                show: function() {
                    deferred = $q.defer();
                    return deferred.promise;
                }
            });
            spyOn(scope, '$emit');
            spyOn(location, 'path');
            spyOn(document, 'removeEventListener');
            spyOn(document, 'addEventListener');
            httpBackend.whenGET(/posts$/).respond(OK_STATUS, POSTS_MOCK);
            ctrl = $controller('PostsController', {$scope: scope, $location: location, $mdDialog: mdDialog, sharedObjectsService: sharedObjectsService, postsService: postsService});
            httpBackend.flush();
        });
    });

    it('should have user and posts defined', function() {
        expect(ctrl.currentUser).toBeDefined();
        expect(ctrl.currentUser).toEqual(USER_MOCK);
        expect(ctrl.posts).toBeDefined();
        expect(ctrl.posts).toEqual(POSTS_MOCK);
    });

    it('should listen for "filterChange" event and update the filter', function() {
        expect(ctrl.filter).toEqual('');
        scope.$broadcast('filterChange', 'Something');
        expect(ctrl.filter).toEqual('Something');
    });
        
    it('should delete a post', function() {
        var postToDelete = ctrl.posts[0];
        var userCommentsCountInThatPost = {numOfComments: 3};
        httpBackend.whenGET(new RegExp('comments\\/count\\?postId=' + postToDelete.id + '&email=' + ctrl.currentUser.email + '$')).respond(OK_STATUS, userCommentsCountInThatPost);
        httpBackend.whenDELETE(new RegExp('posts\\/' + postToDelete.id + '$')).respond(OK_STATUS, SUCCESS_OBJ);
        ctrl.deletePost(postToDelete);
        httpBackend.flush();
        expect(ctrl.posts.indexOf(postToDelete)).toEqual(-1);
        expect(scope.$emit).toHaveBeenCalledWith('deletedPost', userCommentsCountInThatPost.numOfComments);
    });

    it('should redirect to comments view', function() {
        var postToRedirectTo = ctrl.posts[1];
        ctrl.viewDetail(postToRedirectTo);
        expect(location.path).toHaveBeenCalledWith('/post/' + postToRedirectTo.id);
        expect(scope.$emit).toHaveBeenCalledWith('navigationChanged', true);
    });

    it('should add "onpaste" listener when the post dialog is hidden and remove it when the dialog is shown', function() {
        ctrl.scope_.isPostDialogOpen_ = false;
        scope.$digest();
        expect(document.addEventListener).toHaveBeenCalledWith('paste', jasmine.any(Function));
        
        ctrl.scope_.isPostDialogOpen_ = true;
        scope.$digest();
        expect(document.removeEventListener).toHaveBeenCalledWith('paste', jasmine.any(Function));
    });

    it('should create a new post with a dialog', inject(function($timeout) {
        var postResponse = {
            id: 7,
            userId: 1,
            title: 'A generic title',
            body: 'A generic body',
            userFullName: 'Daniel Pedraza',
            numOfComments: 0
        };
        httpBackend.whenPOST(/posts$/).respond(OK_STATUS, postResponse);
        ctrl.showNewPostDialog();
        deferred.resolve({
            title: postResponse.title,
            body: postResponse.body
        });
        $timeout.flush();
        httpBackend.flush();
        expect(ctrl.posts[ctrl.posts.length-1]).toEqual(postResponse);
        expect(scope.$emit).toHaveBeenCalledWith('addedPost');
        expect(ctrl.scope_.isPostDialogOpen_).toBeFalsy();
    }));

    it('should create a new post with a dialog with a body', inject(function($timeout) {
        var postResponse = {
            id: 7,
            userId: 1,
            title: 'A generic title',
            body: 'A generic body',
            userFullName: 'Daniel Pedraza',
            numOfComments: 0
        };
        httpBackend.whenPOST(/posts$/).respond(OK_STATUS, postResponse);
        ctrl.showNewPostDialog(null, postResponse.body);
        deferred.resolve({
            title: postResponse.title,
            body: postResponse.body
        });
        $timeout.flush();
        httpBackend.flush();
        expect(ctrl.posts[ctrl.posts.length-1]).toEqual(postResponse);
        expect(scope.$emit).toHaveBeenCalledWith('addedPost');
        expect(ctrl.scope_.isPostDialogOpen_).toBeFalsy();
    }));

    it('should update a post with a dialog', inject(function($timeout) {
        var postToUpdate = ctrl.posts[2];
        var postUpdated = angular.copy(postToUpdate);
        postUpdated.title = 'A generic title';
        postUpdated.body = 'A generic body';
        httpBackend.whenPUT(new RegExp('posts\\/' + postUpdated.id + '$')).respond(OK_STATUS, postUpdated);
        ctrl.showEditPostDialog(null, postToUpdate);
        deferred.resolve(postUpdated);
        $timeout.flush();
        httpBackend.flush();
        expect(ctrl.posts[2]).toEqual(postUpdated);
        expect(ctrl.scope_.isPostDialogOpen_).toBeFalsy();
    }));

    it('should paste the content of the clipboard into the dialog if the event is supported', function() {
        var clipboardData = 'Clipboard data';
        var pasteEvent = {
            clipboardData: {
                getData: function(type) {
                    if (type == 'text/plain') {
                        return clipboardData;
                    }
                    return '';
                }
            }
        };
        spyOn(ctrl, 'showNewPostDialog');
        ctrl.onPaste_(pasteEvent);
        expect(ctrl.showNewPostDialog).toHaveBeenCalledWith(null, clipboardData);
        
        ctrl.onPaste_({});
        expect(ctrl.showNewPostDialog).toHaveBeenCalledWith(null, '');
    });

    it('should remove "onpaste" listener when "$destroy" event is broadcasted', function() {
        scope.$destroy();
        expect(document.removeEventListener).toHaveBeenCalledWith('paste', jasmine.any(Function));
    });
});