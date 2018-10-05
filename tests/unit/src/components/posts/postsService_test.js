describe('PostsService', function() {

    var httpBackend, service;
    var OK_STATUS = 200;
    var ERROR_STATUS = 500;
    var COMMENTS_COUNT_MOCK = {numOfComments: 4};
    var ERROR_MOCK = {errorMessage: 'w00t'};
    var SUCCESS_OBJ = {successful: true};

    beforeEach(function() {
        module('ngRoute');
        module('ngMaterial');
        module('forumApp');

        inject(function($httpBackend, postsService) {
            httpBackend = $httpBackend;
            service = postsService;
        });
    });

    it('should respond with posts when "getPosts"', function() {
        var postsMockResponse = [
            {
                id: 4,
                userId: 4,
                title: 'eum et est occaecati',
                body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
                userFullName: 'Estefanie Canseco',
                numOfComments: 1
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

        httpBackend.whenGET(/posts$/).respond(OK_STATUS, postsMockResponse);
        service.getPosts()
            .then(function(data) {
                expect(data).toEqual(postsMockResponse);
            }, failWithError);
        httpBackend.flush();
    });

    it('should respond with error when "getPosts"', function() {
        httpBackend.whenGET(/posts$/).respond(ERROR_STATUS, ERROR_MOCK);
        service.getPosts()
            .then(failWithResponse, validateErrorResponse);
        httpBackend.flush();
    });

    it('should respond with count when "getUserCommentsCountInPost"', function() {
        var postId = 1;
        var email = 'mail@company.com'
        httpBackend.whenGET(new RegExp('comments\\/count\\?postId=' + postId + '&email=' + email + '$')).respond(OK_STATUS, COMMENTS_COUNT_MOCK);
        service.getUserCommentsCountInPost(postId, email)
            .then(function(data) {
                expect(data).toEqual(COMMENTS_COUNT_MOCK);
            }, failWithError);
        httpBackend.flush();
    });

    it('should respond with error when "getUserCommentsCountInPost"', function() {
        var postId = 1;
        var email = 'mail@company.com'
        httpBackend.whenGET(/comments\/count\?postId=(\d+)&email=(.+)$/).respond(ERROR_STATUS, ERROR_MOCK);
        service.getUserCommentsCountInPost(1, 'mail@company.com')
            .then(failWithResponse, validateErrorResponse);
        httpBackend.flush();
    });

    it('should save a post and respond with the same post but with id', function() {
        var postToSave = {
            userId: 4,
            title: 'eum et est occaecati',
            body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
            userFullName: 'Estefanie Canseco',
            numOfComments: 1
        };
        var postMockResponse = angular.copy(postToSave);
        postMockResponse.id = 1;
        httpBackend.whenPOST(/posts$/).respond(OK_STATUS, postMockResponse);
        service.savePost(postToSave)
            .then(function(data) {
                expect(data).not.toEqual(postToSave);
                expect(data).toEqual(postMockResponse);
            }, failWithError);
        httpBackend.flush();
    });

    it('should not save a post and respond with error', function() {
        var postToSave = {
            userId: 4,
            title: 'eum et est occaecati',
            body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
            userFullName: 'Estefanie Canseco',
            numOfComments: 1
        };
        httpBackend.whenPOST(/posts$/).respond(ERROR_STATUS, ERROR_MOCK);
        service.savePost(postToSave)
            .then(failWithResponse, validateErrorResponse);
        httpBackend.flush();
    });

    it('should update a post and respond with the same post', function() {
        var postToUpdate = {
            id: 1,
            userId: 4,
            title: 'eum et est occaecati',
            body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
            userFullName: 'Estefanie Canseco',
            numOfComments: 1
        };
        httpBackend.whenPUT(new RegExp('posts\\/' + postToUpdate.id + '$')).respond(OK_STATUS, postToUpdate);
        service.updatePost(postToUpdate)
            .then(function(data) {
                expect(data).toEqual(postToUpdate);
            }, failWithError);
        httpBackend.flush();
    });

    it('should not update a post and respond with error', function() {
        var postToUpdate = {
            id: 1,
            userId: 4,
            title: 'eum et est occaecati',
            body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
            userFullName: 'Estefanie Canseco',
            numOfComments: 1
        };
        httpBackend.whenPUT(/posts\/(\d+)$/).respond(ERROR_STATUS, ERROR_MOCK);
        service.updatePost(postToUpdate)
            .then(failWithResponse, validateErrorResponse);
        httpBackend.flush();
    });

    it('should delete a post and respond with success', function() {
        var id = 1;
        httpBackend.whenDELETE(new RegExp('posts\\/' + id + '$')).respond(OK_STATUS, SUCCESS_OBJ);
        service.deletePost(id)
            .then(function(data) {
                expect(data).toEqual(SUCCESS_OBJ);
            }, failWithError);
        httpBackend.flush();
    });

    it('should not delete a post and respond with error', function() {
        httpBackend.whenDELETE(/posts\/(\d+)$/).respond(ERROR_STATUS, ERROR_MOCK);
        service.deletePost(1)
            .then(failWithResponse, validateErrorResponse);
        httpBackend.flush();
    });

    function validateErrorResponse(error) {
        expect(error.status).toEqual(ERROR_STATUS);
        expect(error.data).toEqual(ERROR_MOCK);
    };

    function failWithError(error) {
        fail('Unexpected error ' + JSON.stringify(error.data));
    };

    function failWithResponse(data) {
        fail('Unexpected data ' + JSON.stringify(data));
    };
});