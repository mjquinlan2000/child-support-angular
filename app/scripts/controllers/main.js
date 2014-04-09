'use strict';

angular.module('childSupportApp')
  .controller('MainCtrl', function ($scope, SUPPORT_SCHEDULE_2014) {

    $scope.initialize = function() {
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
        combinedAdjustedIncome: 0,
        supportObligation: 0,
        obligationShare: 0,
        spouseObligationShare: 0,
        percentageIncome: 0,
        spousePercentageIncome: 0
      };

      $scope.display = {
        percentIncome: 0,
        spousePercentIncome: 0,
        obligationShare: 0,
        spouseObligationShare: 0
      };
    };

    $scope.calculateSupport = function() {
      $scope.adjustedGrossIncome();
      $scope.determineSchedule();
      localStorage.setItem('support', JSON.stringify($scope.support));
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

    $scope.determineSchedule = function() {
      var scheduleEntry,
        numChildren;
      _.each(SUPPORT_SCHEDULE_2014, function(row) {
        if(row.income <= $scope.calculated.combinedAdjustedIncome) {
          scheduleEntry = row;
        }
      });

      numChildren = Math.min($scope.support.numChildren, 6);

      $scope.calculated.supportObligation = scheduleEntry[numChildren];
      $scope.calculated.obligationShare = $scope.calculated.supportObligation * $scope.calculated.percentageIncome;
      $scope.calculated.spouseObligationShare = $scope.calculated.supportObligation * $scope.calculated.spousePercentageIncome;

      $scope.display.obligationShare = $scope.calculated.obligationShare.toFixed(2);
      $scope.display.spouseObligationShare = $scope.calculated.spouseObligationShare.toFixed(2);
    };

    $scope.initialize();

    if(localStorage.getItem('support')) {
      $scope.support = angular.extend($scope.support, JSON.parse(localStorage.getItem('support')));
    }

    $scope.$watchCollection('support', $scope.calculateSupport);
  });
