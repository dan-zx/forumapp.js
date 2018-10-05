/**
 * Profile directive for templating the user profile.
 * 
 * @return {!angular.Directive} Directive definition object.
 * @export
 */
profileDirective = function() {
    return {
        restrict: 'E',
        templateUrl: 'app/shared/profile/profileView.html',
        controller: 'ProfileController',
        controllerAs: 'profile'
    };
};