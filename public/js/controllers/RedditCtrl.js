angular.module('RedditCtrl', ['RedditService']).controller('RedditController', function($scope, Reddit) {

    Reddit.get()
        .then(function (result) {
            $scope.listings = result.children;
        });



});