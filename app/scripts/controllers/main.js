'use strict';

angular.module('childSupportApp')
  .controller('MainCtrl', function ($scope, Utilities, SUPPORT_SCHEDULE_2014) {

    $scope.initialize = function() {
      $scope.support = {
        numChildren: 1,
        numOvernights: 0,
        maintenancePaid: 0,
        maintenanceReceived: 0,
        childOther: 0,
        childSpouse: 0,
        childExp: 0,
        childExpSpouse: 0,
        spouseIncome: 0,
        income: 0,
        otherAdjustments: 0,
        spouseOtherAdjustments: 0
      };

      $scope.calculated = {
        spouseAdjustedIncome: 0,
        adjustedIncome: 0,
        combinedAdjustedIncome: 0,
        supportObligation: 0,
        obligationShare: 0,
        spouseObligationShare: 0,
        percentageIncome: 0,
        spousePercentageIncome: 0,
        adjustmentShare: 0,
        spouseAdjustmentShare: 0,
        combinedAdjustments: 0,
        totalSupport: 0,
        spouseTotalSupport: 0,
        percentageTime: 0,
        spousePercentageTime: 0,
        obligationTime: 0,
        spouseObligationTime: 0
      };

      $scope.display = {
        percentIncome: 0,
        spousePercentIncome: 0,
        obligationShare: 0,
        spouseObligationShare: 0,
        adjustmentShare: 0,
        spouseAdjustmentShare: 0,
        combinedAdjustments: 0,
        totalSupport: 0,
        spouseTotalSupport: 0,
        percentageTime: 0,
        spousePercentageTime: 0,
        obligationTime: 0,
        spouseObligationTime: 0
      };
    };

    $scope.calculateSupport = function() {
      $scope.adjustedGrossIncome();
      $scope.determineSchedule();
      $scope.determineOvernights();
      $scope.determineAdjustments();
      $scope.calculateTotalSupport();
      $scope.calculateSupportOrder();
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

      if(Utilities.useWorksheetB($scope.support.numOvernights)) {
        $scope.calculated.supportObligation *= 1.5;
      }

      $scope.calculated.obligationShare = $scope.calculated.supportObligation * $scope.calculated.percentageIncome;
      $scope.calculated.spouseObligationShare = $scope.calculated.supportObligation * $scope.calculated.spousePercentageIncome;

      $scope.display.obligationShare = $scope.calculated.obligationShare.toFixed(2);
      $scope.display.spouseObligationShare = $scope.calculated.spouseObligationShare.toFixed(2);
    };

    $scope.determineAdjustments = function() {
      var combinedAdjustments = $scope.support.otherAdjustments + $scope.support.spouseOtherAdjustments;

      $scope.calculated.adjustmentShare = combinedAdjustments * $scope.calculated.percentageIncome;
      $scope.calculated.spouseAdjustmentShare = combinedAdjustments * $scope.calculated.spousePercentageIncome;
      $scope.calculated.combinedAdjustments = combinedAdjustments;

      $scope.display.adjustmentShare = $scope.calculated.adjustmentShare.toFixed(2);
      $scope.display.spouseAdjustmentShare = $scope.calculated.spouseAdjustmentShare.toFixed(2);
      $scope.display.combinedAdjustments = $scope.calculated.combinedAdjustments.toFixed(2);
    };

    $scope.calculateTotalSupport = function() {
      if(Utilities.useWorksheetA($scope.support.numOvernights)) {
        var totalSupport = $scope.calculated.adjustmentShare + $scope.calculated.obligationShare,
          spouseTotalSupport = $scope.calculated.spouseAdjustmentShare + $scope.calculated.spouseObligationShare;

        $scope.calculated.totalSupport = totalSupport;
        $scope.calculated.spouseTotalSupport = spouseTotalSupport;
        $scope.display.totalSupport = totalSupport.toFixed(2);
        $scope.display.spouseTotalSupport = spouseTotalSupport.toFixed(2);
      } else {
        var adjustmentsFairShare = Math.max($scope.support.otherAdjustments - $scope.calculated.adjustmentShare, 0),
          spouseAdjustmentsFairShare = Math.max($scope.support.spouseOtherAdjustments - $scope.calculated.spouseAdjustmentShare, 0);

        $scope.calculated.totalSupport = $scope.calculated.obligationTime - adjustmentsFairShare;
        $scope.calculated.spouseTotalSupport = $scope.calculated.spouseObligationTime - spouseAdjustmentsFairShare;

        $scope.display.totalSupport = $scope.calculated.totalSupport.toFixed(2);
        $scope.display.spouseTotalSupport = $scope.calculated.spouseTotalSupport.toFixed(2);
      }
    };

    $scope.calculateSupportOrder = function() {
      if(Utilities.useWorksheetA($scope.support.numOvernights)) {
        var supportOrder = $scope.calculated.totalSupport - $scope.support.otherAdjustments,
          spouseSupportOrder = $scope.calculated.spouseTotalSupport - $scope.support.spouseOtherAdjustments;

        $scope.calculated.supportOrder = supportOrder;
        $scope.calculated.spouseSupportOrder = spouseSupportOrder;

        if(Utilities.youHaveMajority($scope.support.numOvernights)) {
          $scope.display.whoPays = "Spouse Pays";
          $scope.display.supportOrderAmount = $scope.calculated.spouseSupportOrder.toFixed(2);
        } else {
          $scope.display.whoPays = "You Pay";
          $scope.display.supportOrderAmount = $scope.calculated.supportOrder.toFixed(2);
        }
      } else {
        if($scope.calculated.totalSupport > $scope.calculated.spouseTotalSupport) {
          $scope.display.whoPays = 'Spouse Pays';
        } else {
          $scope.display.whoPays = 'You Pay';
        }

        $scope.display.supportOrderAmount = Math.abs($scope.calculated.totalSupport - $scope.calculated.spouseTotalSupport).toFixed(2);
      }
    };

    $scope.determineOvernights = function() {
      $scope.calculated.percentageTime = $scope.support.numOvernights / 365;
      $scope.calculated.spousePercentageTime = 1 - $scope.calculated.percentageTime;
      $scope.calculated.obligationTime = $scope.calculated.percentageTime * $scope.calculated.spouseObligationShare;
      $scope.calculated.spouseObligationTime = $scope.calculated.spousePercentageTime * $scope.calculated.obligationShare;

      $scope.display.percentageTime = Math.round($scope.calculated.percentageTime*100);
      $scope.display.spousePercentageTime = Math.round($scope.calculated.spousePercentageTime*100);
      $scope.display.obligationTime = $scope.calculated.obligationTime.toFixed(2);
      $scope.display.spouseObligationTime = $scope.calculated.spouseObligationTime.toFixed(2);
    };

    $scope.initialize();

    if(localStorage.getItem('support')) {
      $scope.support = angular.extend($scope.support, JSON.parse(localStorage.getItem('support')));
    }

    $scope.$watchCollection('support', $scope.calculateSupport);
  });
