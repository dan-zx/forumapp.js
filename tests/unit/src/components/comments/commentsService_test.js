describe('CommentsService', function() {

    var httpBackend, service;
    var OK_STATUS = 200;
    var ERROR_STATUS = 500;
    var ERROR_MOCK = {errorMessage: 'w00t'};
    var SUCCESS_OBJ = {successful: true};

    beforeEach(function() {
        module('ngRoute');
        module('ngMaterial');
        module('forumApp');

        inject(function($httpBackend, commentsService) {
            httpBackend = $httpBackend;
            service = commentsService;
        });
    });

    it('should respond with post with coments when "getPostWithComments"', function() {
        var postMockResponse = {
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
        httpBackend.whenGET(new RegExp('posts\\/' + postMockResponse.id + '\\?_embed=comments$')).respond(OK_STATUS, postMockResponse);
        service.getPostWithComments(postMockResponse.id)
            .then(function(data) {
                expect(data).toEqual(postMockResponse);
            }, failWithError);
        httpBackend.flush();
    });

    it('should respond with error when "getPostWithComments"', function() {
        httpBackend.whenGET(/posts\/\d+\?_embed=comments$/).respond(ERROR_STATUS, ERROR_MOCK);
        service.getPostWithComments(1)
            .then(failWithResponse, validateErrorResponse);
        httpBackend.flush();
    });

    it('should save a comment and respond with the same comment but with id', function() {
        var commentToSave = {
            postId: 1,
            name: 'id labore ex et quam laborum',
            email: 'Daniel_Pedraza@github.com',
            body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
        };
        var commentMockResponse = angular.copy(commentToSave);
        commentMockResponse.id = 1;
        httpBackend.whenPOST(/comments$/).respond(OK_STATUS, commentMockResponse);
        service.saveComment(commentToSave)
            .then(function(data) {
                expect(data).not.toEqual(commentToSave);
                expect(data).toEqual(commentMockResponse);
            }, failWithError);
        httpBackend.flush();
    });

    it('should not save a comment and respond with error', function() {
        var commentToSave = {
            postId: 1,
            name: 'id labore ex et quam laborum',
            email: 'Daniel_Pedraza@github.com',
            body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
        };
        httpBackend.whenPOST(/comments$/).respond(ERROR_STATUS, ERROR_MOCK);
        service.saveComment(commentToSave)
            .then(failWithResponse, validateErrorResponse);
        httpBackend.flush();
    });

    it('should update a comment and respond with the same comment', function() {
        var commentToUpdate = {
            id: 1,
            postId: 1,
            name: 'id labore ex et quam laborum',
            email: 'Daniel_Pedraza@github.com',
            body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
        };
        httpBackend.whenPUT(new RegExp('comments\\/' + commentToUpdate.id + '$')).respond(OK_STATUS, commentToUpdate);
        service.updateComment(commentToUpdate)
            .then(function(data) {
                expect(data).toEqual(commentToUpdate);
            }, failWithError);
        httpBackend.flush();
    });

    it('should not update a comment and respond with error', function() {
        var commentToUpdate = {
            id: 1,
            postId: 1,
            name: 'id labore ex et quam laborum',
            email: 'Daniel_Pedraza@github.com',
            body: 'laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium'
        };
        httpBackend.whenPUT(/comments\/(\d+)$/).respond(ERROR_STATUS, ERROR_MOCK);
        service.updateComment(commentToUpdate)
            .then(failWithResponse, validateErrorResponse);
        httpBackend.flush();
    });

    it('should delete a comment and respond with success', function() {
        httpBackend.whenDELETE(/comments\/(\d+)$/).respond(OK_STATUS, SUCCESS_OBJ);
        service.deleteComment(1)
            .then(function(data) {
                expect(data).toEqual(SUCCESS_OBJ);
            }, failWithError);
        httpBackend.flush();
    });

    it('should not delete a comment and respond with error', function() {
        var id = 1;
        httpBackend.whenDELETE(/comments\/(\d+)$/).respond(ERROR_STATUS, ERROR_MOCK);
        service.deleteComment(id)
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