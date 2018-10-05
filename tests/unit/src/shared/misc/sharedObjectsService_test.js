describe('SharedObjectsService', function() {

    var sharedObjectsService_;
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

        inject(function(sharedObjectsService) {
            sharedObjectsService_ = sharedObjectsService;
        });
    });

    it('should have current user already defined', function() {
        expect(sharedObjectsService_.currentUser).toBeDefined();
        expect(sharedObjectsService_.currentUser).toEqual(MOCK_USER);
    });
});