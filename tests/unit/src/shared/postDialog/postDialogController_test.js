describe('PostDialogController', function() {

    var controller, mdDialog;

    beforeEach(function() {
        module('ngRoute');
        module('ngMaterial');
        module('forumApp');

        inject(function($controller, $mdDialog) {
            controller = $controller; 
            mdDialog = $mdDialog;
            spyOn(mdDialog, 'cancel');
            spyOn(mdDialog, 'hide');
        });
    });

    it("should have no post info when locals don't have info", function() {
        var ctrl = controller('PostDialogController', {$mdDialog: mdDialog, locals: {}});
        expect(ctrl.post.body).not.toBeDefined();
        expect(ctrl.post.title).not.toBeDefined();
    });

    it('should have post info when locals have info', function() {
        var post_ = {
            id: 1,
            userId: 4,
            title: 'eum et est occaecati',
            body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
            userFullName: 'Estefanie Canseco',
            numOfComments: 10
        };
        var locals_ = {post: post_};
        var ctrl = controller('PostDialogController', {$mdDialog: mdDialog, locals: locals_});
        expect(ctrl.post).toBeDefined();
        expect(ctrl.post).toEqual(post_);
    });

    it('should have post body when locals have body', function() {
        var body_ = 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit';
        var locals_ = {body: body_};
        var ctrl = controller('PostDialogController', {$mdDialog: mdDialog, locals: locals_});
        expect(ctrl.post.body).toBeDefined();
        expect(ctrl.post.body).toEqual(body_);
    });

    it('should cancel dialog and reset post when canceled', function() {
        var ctrl = controller('PostDialogController', {$mdDialog: mdDialog, locals: {}});
        ctrl.post = {
            id: 1,
            userId: 4,
            title: 'eum et est occaecati',
            body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
            userFullName: 'Estefanie Canseco',
            numOfComments: 10
        };
        ctrl.cancel();
        expect(mdDialog.cancel).toHaveBeenCalled();
        expect(ctrl.post).toEqual({});
    });

    it('should hide dialog, send post and reset it when submitted ', function() {
        var ctrl = controller('PostDialogController', {$mdDialog: mdDialog, locals: {}});
        var post = {
            id: 1,
            userId: 4,
            title: 'eum et est occaecati',
            body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
            userFullName: 'Estefanie Canseco',
            numOfComments: 10
        };
        ctrl.post = post;
        ctrl.submit();
        expect(mdDialog.hide).toHaveBeenCalledWith(post);
        expect(ctrl.post).toEqual({});
    });
});