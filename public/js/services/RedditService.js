angular.module('RedditService', []).factory('Reddit', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/reddit');
        }
    }

}]);