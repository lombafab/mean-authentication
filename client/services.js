/**
 * Created by fabiolombardi on 15/09/2015.
 */
angular.module('myApp').factory('AuthService', ['$q','$timeout', '$http', function($q, $timeout, $http){

    // create user variable
    var user = null;

    var isLoggedIn = function(){
        if (user) {
            return true;
        } else {
            return false;
        }
    };

    var getUserStatus = function() {
        return user;
    };

    var login = function(username, password) {
        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('user/login', {username: username, password: password})
            // handle success
            .success(function(data, status) {
               if (status === 200 && data.status){
                   user = true;
                   deferred.resolve();
               } else {
                   user = false;
                   deferred.reject();
               }
            })
            // handle error
            .error(function(data){
               user = false;
               deferred.reject();
            });

        // return promise object
        return deferred.promise;
    };

    var logout = function() {
        //create a new instance of deferred
        var deferred = $q.defer();

        // send a get request to the server
        $http.get('user/logout', {})
            //handle success
            .success(function(data, status){
                user = false;
                deferred.resolve();
            })
            // handle error
            .error(function(data){
                user = false;
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

    };

    var register = function(username, password){
        // create a new instance of deferred
        var deferred = $q.defer();

        // send a post request to the server
        $http.post('user/register', {username: username, password: password})
            //handle success
            .success(function(data, status){
                if (status === 200 && data.status) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            })

            //handle error
            .error(function(data){
                deferred.reject();
            });

        // return promise object
        return deferred.promise;
    };

    // return available functions for use in controller
    return ({
        isLoggedIn: isLoggedIn,
        getUserStatus: getUserStatus,
        login: login,
        logout: logout,
        register: register
    });
}]);