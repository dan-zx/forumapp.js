/**
 * Header controller.
 *
 * @param {!angular.$scope} $scope
 * @param {!ngRoute.$location} $location
 * @param {!ngMaterial.$mdSidenav} $mdSidenav
 * @constructor
 * @ngInject
 * @export
 */
HeaderController = function($scope, $location, $mdSidenav) {

    /**
     * False when the navigation is in the index page, true otherwise.
     * @export {!boolean}
     */
    this.shouldGoBack = false;

    /**
     * @private
     */
    this.scope_ = $scope;

    /**
     * @private
     */
    this.location_ = $location;

    /**
     * @private
     */
    this.mdSidenav_ = $mdSidenav;

    /**
     * Global filter.
     * @export {!string}
     */
    this.scope_.filter = '';

    // When the user types in the filter box, broadcast 'filterChange' event
    this.scope_.$watch('filter', function(newValue, oldValue) {
        this.scope_.$broadcast('filterChange', newValue);
    }.bind(this));

    // Listens for navigation changed event
    $scope.$on('navigationChanged', function(event, value) {
    	this.shouldGoBack = value;
        this.hideSearch();
    }.bind(this));
};



/**
 * Handles navigation menu.
 * 
 * @export
 */
HeaderController.prototype.navigation = function() {
    if (this.shouldGoBack) {
        this.location_.path('/index');
        this.shouldGoBack = false;
    } else {
        this.mdSidenav_('user-profile').toggle();
    }
};


/**
 * Hides the search view.
 * 
 * @export
 */
HeaderController.prototype.hideSearch = function() {
    this.showSearch = false;
    this.scope_.filter = '';
}