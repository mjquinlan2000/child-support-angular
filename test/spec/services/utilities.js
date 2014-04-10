'use strict';

describe('Service: Utilities', function() {
  var Utilities;

  beforeEach(module('childSupportApp'));

  beforeEach(inject(function(_Utilities_) {
    Utilities = _Utilities_;
  }));

  it('calculates if you have majority parenting time', function() {
    var overnights = 273;
    expect(Utilities.youHaveMajority(overnights)).toBe(true);
    expect(Utilities.spouseHasMajority(overnights)).toBe(false);
  });

  it('calculates if your spouse majority parenting time', function() {
    var overnights = 92;
    expect(Utilities.youHaveMajority(overnights)).toBe(false);
    expect(Utilities.spouseHasMajority(overnights)).toBe(true);
  });

  it('knows when to use worksheet A', function() {
    var overnights = 22;
    expect(Utilities.useWorksheetA(overnights)).toBe(true);
    expect(Utilities.useWorksheetB(overnights)).toBe(false);
  });

  it('knows when to use worksheet B', function() {
    var overnights = 123;
    expect(Utilities.useWorksheetA(overnights)).toBe(false);
    expect(Utilities.useWorksheetB(overnights)).toBe(true);
  });
});
