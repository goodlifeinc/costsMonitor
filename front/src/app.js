angular.module('MyApp', ['ngMaterial'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('cyan')
            .accentPalette('teal');
    })
    .run(function () {
        console.log('My app is ready! Magic happens now.');
    });