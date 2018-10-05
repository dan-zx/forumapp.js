describe('HeaderDirective', function() {

    var scope, compile, httpBackend;

    beforeEach(function() {
        module('ngRoute');
        module('ngMaterial');
        module('forumApp');
        module('forumAppTemplates');

        inject(function($rootScope, $compile, $httpBackend) {
            scope = $rootScope.$new();
            compile = $compile;
            httpBackend = $httpBackend;
        });
    });

    it('should create controller', function() {
        var headerView = compileHeaderView();
        var ctrl = headerView.controller('headerView');
        expect(ctrl).toBeDefined();
    });

    it('should change navigation button text and icon when "navigationChanged" event', function() {
        var headerView = compileHeaderView();
        expect(headerView.find('#navBtn').attr('aria-label')).toEqual('Menu');
        expect(headerView.find('#navIcon').attr('md-svg-icon')).toEqual('assets/img/ic_menu.svg');
        scope.$broadcast('navigationChanged', true);
        scope.$digest();
        expect(headerView.find('#navBtn').attr('aria-label')).toEqual('Back');
        expect(headerView.find('#navIcon').attr('md-svg-icon')).toEqual('assets/img/ic_arrow_back.svg');
        scope.$broadcast('navigationChanged', false);
        scope.$digest();
        expect(headerView.find('#navBtn').attr('aria-label')).toEqual('Menu');
        expect(headerView.find('#navIcon').attr('md-svg-icon')).toEqual('assets/img/ic_menu.svg');
    });

    it('should hide original toolbar and show search', function() {
        var headerView = compileHeaderView();
        expect(headerView.find('#toolbar').attr('aria-hidden')).toEqual('false');
        expect(headerView.find('#searchToolbar').attr('aria-hidden')).toEqual('true');
        
        headerView.find('#showSearchBtn').click();
        scope.$digest();
        expect(headerView.find('#toolbar').attr('aria-hidden')).toEqual('true');
        expect(headerView.find('#searchToolbar').attr('aria-hidden')).toEqual('false');
        
        headerView.find('#hideSearchBtn').click();
        scope.$digest();
        expect(headerView.find('#toolbar').attr('aria-hidden')).toEqual('false');
        expect(headerView.find('#searchToolbar').attr('aria-hidden')).toEqual('true');
    });

    function compileHeaderView() {
        var headerView = compile('<header-view />')(scope);
        httpBackend.whenGET(/assets\/img\/.+\..+$/).respond('');
        scope.$digest();
        return headerView;
    };
});