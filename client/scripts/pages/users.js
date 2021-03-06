define(['angular', 'text!./users.html'], function(angular, template) {
  'use strict';
  var Controller = ['$scope', 'UserResource', function ($scope, UserResource) {

    $scope.availableOperations={};
    $scope.loadingState = 'LOADING';

    UserResource.query().$promise.then(function(response) {
      $scope.userList = response;
      $scope.loadingState = response.length ? 'LOADED' : 'EMPTY';
    });

    UserResource.OPTIONS().$promise.then(function(response) {
      angular.forEach(response.links, function(link){
        $scope.availableOperations[link.rel] = true;
      });
    });

  }];

  return [ '$routeProvider', function($routeProvider) {
    $routeProvider.when('/users', {
      template: template,
      controller: Controller,
      authentication: 'required'
    });
  }];
});
