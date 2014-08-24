'use strict';

/**
 * @ngdoc function
 * @name examplesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the examplesApp
 */
angular.module('examplesApp')
  .controller('MainCtrl', function ($scope) {
    $scope.test = function() {
      console.log('test worked');
    }
  });
