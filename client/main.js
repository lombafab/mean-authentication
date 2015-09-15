var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {templateUrl: '/partials/home.html'})
    .when('/login', {templateUrl: 'partials/login.html', controller:'loginCtrl'})
    .when('/register', {templateUrl: 'partials/register.html', controller:'registerCtrl'})
    .when('/logout', {controller:'logoutCtrl'})
    .when('/one', {template: '<h1>This is page one!</h1>'})
    .when('/two', {template: '<h1>This is page two!</h1>'})
    .otherwise({redirectTo: '/'});
});