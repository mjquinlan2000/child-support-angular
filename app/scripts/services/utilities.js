'use strict';

angular.module('childSupportApp')
  .service('Utilities', function() {
    return {
      useWorksheetA: function(overnights) {
        return this.youHaveMajority(overnights) || this.spouseHasMajority(overnights);
      },

      useWorksheetB: function(overnights) {
        return !this.useWorksheetA(overnights);
      },

      youHaveMajority: function(overnights) {
        return overnights >= 273;
      },

      spouseHasMajority: function(overnights) {
        return overnights <= 92;
      }
    };
  });
