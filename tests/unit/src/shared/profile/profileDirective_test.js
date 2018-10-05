describe('ProfileDirective', function() {

    var scope, compile, httpBackend;
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
        module('forumAppTemplates');
        module(function($provide) {
            $provide.value('httpSync', {
                get: function(unused) {
                    return MOCK_USER;
                }
            });
        });

        inject(function($rootScope, $compile, $httpBackend) {
            scope = $rootScope.$new();
            compile = $compile;
            httpBackend = $httpBackend;
        });
    });
    
    it('should create controller', function() {
        var profileView = compileProfileView();
        var ctrl = profileView.controller('profile');
        expect(ctrl).toBeDefined();
        expect(ctrl.user).toBeDefined();
        expect(ctrl.user).toEqual(MOCK_USER);
    });

    it('should contain user information', function() {
        var profileView = compileProfileView();
        var ctrl = profileView.controller('profile');
        expect(profileView.find('#name').html()).toEqual(ctrl.user.name);
        expect(profileView.find('#email').html()).toEqual(ctrl.user.email);
        expect(profileView.find('#numOfPosts').html()).toEqual(String(ctrl.user.numOfPosts));
        expect(profileView.find('#numOfComments').html()).toEqual(String(ctrl.user.numOfComments));
    });

    function compileProfileView() {
        var profileView = compile('<profile />')(scope);
        httpBackend.whenGET(/assets\/img\/.+\..+$/).respond('');
        scope.$digest();
        return profileView;
    };
});