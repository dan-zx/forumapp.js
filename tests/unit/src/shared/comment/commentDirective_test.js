describe('CommentDirective', function() {

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

    it('should create controller', function() {
        var scope = rootScope.$new();
        var commentView = compileCommentView('<comment />', scope);
        var ctrl = commentView.controller('comment');
        expect(ctrl).toBeDefined();
    });

    it('should show comment model in view', function() {
        var scope = rootScope.$new();
        scope.comment = {
            postId: 1,
            id: 1,
            name: 'id labore ex et quam laborum',
            email: 'Daniel_Pedraza@github.com',
            body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
        };
        var commentView = compileCommentView('<comment comment-model="comment" />', scope);
        expect(commentView.find('#email').html()).toEqual(scope.comment.email);
        expect(commentView.find('#readonlyBody').html()).toEqual(scope.comment.body);
    });

    it('should show options menu', function() {
        var scope = rootScope.$new();
        scope.showMenu = true;
        var commentView = compileCommentView('<comment show-options-menu="showMenu" />', scope);
        expect(commentView.find('#optionsMenu').html()).toBeDefined();
    });

    it('should be able to call "onDelete" when click on "deletBtn" or "editComment" when click on "editBtn" when the menu is shown', function() {
        var scope = rootScope.$new();
        scope.onDelete = jasmine.createSpy('onDelete');
        var commentView = compileCommentView('<comment show-options-menu="true" delete-fn="onDelete()" />', scope);
        var ctrl = commentView.controller('comment');
        spyOn(ctrl, 'editComment')
        expect(commentView.find('#optionsMenu').html()).toBeDefined();
        commentView.find('#deleteBtn').click();
        expect(scope.onDelete).toHaveBeenCalled();
        commentView.find('#editBtn').click();
        expect(ctrl.editComment).toHaveBeenCalled();
    });

    it('should not be able to call "onDelete" when click on "deletBtn" nor "editComment" when click on "editBtn" when the menu is hidden', function() {
        var scope = rootScope.$new();
        scope.onDelete = jasmine.createSpy('onDelete');
        var commentView = compileCommentView('<comment show-options-menu="false" delete-fn="onDelete()" />', scope);
        var ctrl = commentView.controller('comment');
        spyOn(ctrl, 'editComment')
        expect(commentView.find('#optionsMenu').html()).not.toBeDefined();
        commentView.find('#deleteBtn').click();
        expect(scope.onDelete).not.toHaveBeenCalled();
        commentView.find('#editBtn').click();
        expect(ctrl.editComment).not.toHaveBeenCalled();
    });

    it('should switch to edit mode and hide menu when "editBtn" is clicked', function() {
        var scope = rootScope.$new();
        scope.comment = {
            postId: 1,
            id: 1,
            name: 'id labore ex et quam laborum',
            email: 'Daniel_Pedraza@github.com',
            body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
        };
        var commentView = compileCommentView('<comment comment-model="comment" show-options-menu="true"  />', scope);

        expect(commentView.find('#editableBody').html()).not.toBeDefined();

        commentView.find('#editBtn').click();
        scope.$digest();

        expect(commentView.find('#optionsMenu').html()).not.toBeDefined();
        expect(commentView.find('#readonlyBody').html()).not.toBeDefined();
        expect(commentView.find('#editableBody').html()).toBeDefined();
        expect(commentView.find('#editableBody').val()).toEqual(scope.comment.body);
        
        var ctrl = commentView.controller('comment');
        var newBody = 'New body';
        ctrl.editableComment.body = newBody;
        expect(scope.comment.body).not.toEqual(newBody);
        scope.$digest();
        expect(commentView.find('#editableBody').val()).toEqual(newBody);
    });

    function compileCommentView(markup, scope) {
        var commentView = compile(markup)(scope);
        httpBackend.whenGET(/assets\/img\/.+\..+$/).respond('');
        scope.$digest();
        return commentView;
    };
});