'use strict';

angular.module('childSupportApp')
  .controller('MainCtrl', function ($scope) {
    $scope.support = {
      numChildren: 0,
      numOvernights: 0,
      maintenancePaid: 0,
      maintenanceReceived: 0,
      childOther: 0,
      childSpouse: 0,
      childExp: 0,
      childExpSpouse: 0,
      spouseIncome: 0,
      income: 0
    };

    $scope.calculated = {
      spouseAdjustedIncome: 0,
      adjustedIncome: 0,
      combinedAdjustedIncome: 0
    };

    $scope.display = {
      percentIncome: 0,
      spousePercentIncome: 0
    };

    $scope.calculateSupport = function() {
      $scope.adjustedGrossIncome();
    };

    $scope.adjustedGrossIncome = function() {
      var s = $scope.support;
      $scope.calculated.spouseAdjustedIncome = s.spouseIncome + s.maintenancePaid - s.maintenanceReceived - s.childSpouse - s.childExpSpouse;
      $scope.calculated.adjustedIncome = s.income + s.maintenanceReceived - s.maintenancePaid - s.childOther - s.childExp;

      $scope.calculated.combinedAdjustedIncome = $scope.calculated.adjustedIncome + $scope.calculated.spouseAdjustedIncome;

      if($scope.calculated.combinedAdjustedIncome > 0) {
        $scope.calculated.percentageIncome = $scope.calculated.adjustedIncome/$scope.calculated.combinedAdjustedIncome;
        $scope.calculated.spousePercentageIncome = $scope.calculated.spouseAdjustedIncome/$scope.calculated.combinedAdjustedIncome;
      } else {
        $scope.calculated.percentageIncome = 0;
        $scope.calculated.spousePercentageIncome = 0;
      }

      $scope.display.percentIncome = Math.round($scope.calculated.percentageIncome*100);
      $scope.display.spousePercentIncome = Math.round($scope.calculated.spousePercentageIncome*100);
    };

    $scope.$watchCollection('support', $scope.calculateSupport);
  });
