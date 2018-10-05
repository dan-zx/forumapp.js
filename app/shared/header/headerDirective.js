/**
 * Header directive for templating the page header.
 * 
 * @return {!angular.Directive} Directive definition object.
 * @export
 */
headerDirective = function() {
    return {
        restrict: 'E',
        templateUrl: 'app/shared/header/headerView.html',
        controller: 'HeaderController',
        controllerAs: 'header'
    };
};