describe('CommentDirectiveController', function() {

    var scope, httpBackend, keyCodes_, ctrl;
    var OK_STATUS = 200;

    beforeEach(function() {
        module('ngRoute');
        module('ngMaterial');
        module('forumApp');

        inject(function($rootScope, $controller, keyCodes) {
            scope = $rootScope.$new();
            spyOn(scope, '$emit');
            scope.commentModel = {
                postId: 1,
                id: 1,
                name: 'id labore ex et quam laborum',
                email: 'Daniel_Pedraza@github.com',
                body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
            };
            keyCodes_ = keyCodes;
            ctrl = $controller('CommentDirectiveController', {$scope: scope, keyCodes: keyCodes_});
        });
    });

    it('should set edit mode', function() {
        ctrl.editComment();
        expect(ctrl.editMode).toBeTruthy();
        expect(ctrl.editableComment).toEqual(scope.commentModel);
        ctrl.editableComment.body = 'New body comment';
        expect(ctrl.editableComment.body).not.toEqual(scope.commentModel.body);
    });

    it('should cancel edit mode when "esc" key is pressed', function() {
        ctrl.editComment();
        ctrl.editableComment.body = 'New body comment';
        event = {keyCode: keyCodes_['esc']};
        ctrl.onKeyPress(event);
        expect(ctrl.editMode).toBeFalsy();
        expect(ctrl.editableComment).toEqual({});
    }); 

    it('should submit comment changes when "enter" key is pressed', function() {
        ctrl.editComment();
        ctrl.editableComment.body = 'New body comment';
        var submitedComment = ctrl.editableComment;
        event = {keyCode: keyCodes_['enter']};
        ctrl.onKeyPress(event);
        expect(ctrl.editMode).toBeFalsy();
        expect(ctrl.editableComment).toEqual({});
        expect(scope.$emit).toHaveBeenCalledWith('commentUpdated', submitedComment);
    }); 
});