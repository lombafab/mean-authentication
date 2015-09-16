var myApp = angular.module('myApp', ['ngRoute']);

myApp

.config(function ($routeProvider) {
  $routeProvider
    .when('/', {templateUrl: '/partials/home.html'})
    .when('/login', {
          templateUrl: 'partials/login.html',
          controller:'loginCtrl',
          access: {restricted: false}
    })
    .when('/register', {
          templateUrl: 'partials/register.html',
          controller:'registerCtrl',
          access: {restricted: false}
    })
    .when('/logout', {
          controller:'logoutCtrl',
          access: {restricted: true}
    })
    .when('/one', {
          template: '<h1>This is a restricted page!</h1>',
          access: {restricted: true}
    })
    .when('/two', {
          template: '<h1>This is page two!</h1>',
          access: {restricted: false}
    })
    .otherwise({redirectTo: '/'})
})

.run(function($rootScope, $location, $route, AuthService){
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
        if (next.access.restricted && AuthService.isLoggedIn() === false) {
            $location.path('login');
            $route.reload();
        }
    })
});