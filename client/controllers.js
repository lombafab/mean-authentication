/**
 * Created by fabiolombardi on 15/09/2015.
 */
angular.module('myApp').controller('loginCtrl', ['$scope', '$location', 'AuthService', function($scope, $location, AuthService){

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
                $scope.disabled = false;
                $scope.loginForm = {}
            })

            // handle error
            .catch(function() {
                $scope.error = true;
                $scope.errorMessage = "Invalid username and/or password";
            })
    };
}]);