describe('HeaderController', function() {

    var scope, ctrl, location, toggleSpy;

    beforeEach(function() {
        module('ngRoute');
        module('ngMaterial');
        module('forumApp');
        module(function($provide) {
            toggleSpy = jasmine.createSpy('toggle');
            $provide.value('$mdSidenav', function(unused) {
                return {
                    toggle: toggleSpy
                };
            });
        });

        inject(function($rootScope, $controller, $location, $mdSidenav) {
            scope = $rootScope.$new();
            location = $location;
            ctrl = $controller('HeaderController', {$scope : scope, $location: location, $mdSidenav: $mdSidenav});
        });
    });

    it('should toggle user profile when "navigationChanged" event is called with "false"', function() {
        spyOn(location, 'path');
        scope.$broadcast('navigationChanged', false);
        expect(ctrl.shouldGoBack).toBeFalsy();
        ctrl.navigation();
        expect(ctrl.shouldGoBack).toBeFalsy();
        expect(toggleSpy).toHaveBeenCalled();
    });

    it('should return to index when "navigationChanged" event is called with "true"', function() {
        spyOn(location, 'path');
        scope.$broadcast('navigationChanged', true);
        expect(ctrl.shouldGoBack).toBeTruthy();
        ctrl.navigation();
        expect(ctrl.showSearch).toBeFalsy();
        expect(scope.filter).toEqual('');
        expect(ctrl.shouldGoBack).toBeFalsy();
        expect(location.path).toHaveBeenCalledWith('/index');
        expect(toggleSpy).not.toHaveBeenCalled(); 
    });

    it('should broadcast "filterChange" event when the filter changes', function() {
        spyOn(scope, '$broadcast');
        scope.filter = 'Something';
        scope.$digest();
        expect(scope.$broadcast).toHaveBeenCalledWith('filterChange', 'Something'); 
    });
});