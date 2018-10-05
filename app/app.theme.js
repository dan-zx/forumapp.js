/**
 * Material theme configuration.
 *
 * @param {!ngMaterial.$mdThemingProvider} $mdThemingProvider
 * @constructor
 * @ngInject
 * @export
 */
ThemeConfig = function($mdThemingProvider) {
    $mdThemingProvider.theme('dark')
        .primaryPalette('pink')
        .accentPalette('indigo')
        .dark();
};