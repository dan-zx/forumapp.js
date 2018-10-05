describe('PostDirective', function() {

    var rootScope, compile, httpBackend;

    beforeEach(function() {
        module('ngRoute');
        module('ngMaterial');
        module('forumApp');
        module('forumAppTemplates');

        inject(function($rootScope, $compile, $httpBackend) {
            rootScope = $rootScope;
            compile = $compile;
            httpBackend = $httpBackend;
        });
    });

    it('should show post model in view', function() {
        var scope = rootScope.$new();
        scope.post = {
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
            userFullName: 'Daniel Pedraza',
            numOfComments: 6
        };
        var numOfCommentsText = getNumOfCommentsText(scope.post.numOfComments);
        var userNameText = getUserNameText(scope.post.userFullName);
        var postView = compilePostView('<post post-model="post" />', scope);
        expect(postView.find('#title').html()).toEqual(scope.post.title);
        expect(postView.find('#body').html()).toEqual(scope.post.body);
        expect(postView.find('#numOfComments').html()).toEqual(numOfCommentsText);
        expect(postView.find('#userFullName').html()).toEqual(userNameText);
    });

    it('should show options menu', function() {
        var scope = rootScope.$new();
        scope.showMenu = true;
        var postView = compilePostView('<post show-options-menu="showMenu" />', scope);
        expect(postView.find('#optionsMenu').html()).toBeDefined();
    });

    it('should call functions when click in buttons', function() {
        var scope = rootScope.$new();
        scope.onDelete = jasmine.createSpy('onDelete');
        scope.onEdit = jasmine.createSpy('onEdit');
        scope.onClickComments = jasmine.createSpy('onClickComments');
        var postView = compilePostView('<post show-options-menu="true" delete-fn="onDelete()" edit-fn="onEdit()" click-comments-fn="onClickComments()" />', scope);
        postView.find('#editBtn').click();
        expect(scope.onEdit).toHaveBeenCalled();
        postView.find('#deleteBtn').click();
        expect(scope.onDelete).toHaveBeenCalled();
        postView.find('#commentsBtn').click();
        expect(scope.onClickComments).toHaveBeenCalled();
    });

    it('should not be able to call deleteFn and editFn when the menu is hidden', function() {
        var scope = rootScope.$new();
        scope.onDelete = jasmine.createSpy('onDelete');
        scope.onEdit = jasmine.createSpy('onEdit');
        var postView = compilePostView('<post show-options-menu="false" delete-fn="onDelete()" edit-fn="onEdit()" />', scope);
        postView.find('#editBtn').click();
        expect(scope.onEdit).not.toHaveBeenCalled();
        postView.find('#deleteBtn').click();
        expect(scope.onDelete).not.toHaveBeenCalled();
    });

    function compilePostView(markup, scope) {
        var postView = compile(markup)(scope);
        httpBackend.whenGET(/assets\/img\/.+\..+$/).respond('');
        scope.$digest();
        return postView;
    };
    
    function getNumOfCommentsText(numOfComments) {
        return numOfComments + (numOfComments == 1 ? ' comment' : ' comments');
    };

    function getUserNameText(userName) {
        return 'Posted by ' + userName;
    };
});