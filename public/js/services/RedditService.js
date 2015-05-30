angular.module('RedditService', []).factory('Reddit', ['$http', '$q', function ($http, $q) {

    return {

        get: function () {
            var self = this;
            if (self.data) {
                return $q.when(this.data);
            }
            else {
                return $http.get('/api/reddit')
                    .then(function (response) {
                        if (response.status === 200) {
                            self.data = response.data;
                            return self.data;
                        }
                    });
            }

        }
    }

}]);