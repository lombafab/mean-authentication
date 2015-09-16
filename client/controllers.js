/**
 * Created by fabiolombardi on 15/09/2015.
 */
angular.module('myApp')

.controller('loginCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService){

    console.log(AuthService.getUserStatus());

    $scope.login = function() {
        // initial values
        $scope.error = false;
        $scope.disabled = false;

        // call login form service
        AuthService.login($scope.loginForm.username, $scope.loginForm.password)
            //handle success
            .then(function() {
                $location.path('/');
                $scope.disabled = true;
                $scope.loginForm = {}
            })

            // handle error
            .catch(function() {
                $scope.error = true;
                $scope.errorMessage = "Invalid username and/or password";
            })
    };
}])

.controller('logoutCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
    $scope.logout = function(){
        console.log(AuthService.getUserStatus());

        // call logout from service
        AuthService.logout()
            .then(function(){
                $location.path('/login');
            })
    };
}])

.controller('registerCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService){
    console.log(AuthService.getUserStatus());

    $scope.register = function() {
        // initial values
        $scope.error = false;
        $scope.disabled = false;

        // call register from service
        AuthService.register($scope.registerForm.username, $scope.registerForm.password)
            //handle success
            .then(function(){
                $location.path('/login')
                $scope.disabled = false;
                $scope.registerForm = {}
            })

            // handle error
            .catch(function(){
                $scope.error = true;
                $scope.errorMessage = "User already exists"
                $scope.disabled = false;
                $scope.registerForm = {};
            })
    };
}]);