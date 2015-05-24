angular.module('RedditService', []).factory('Reddit', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/reddit')
                .then(function (response) {
                    if(response.status === 200) {
                        return response.data;
                    }
                });
        }
    }

}]);