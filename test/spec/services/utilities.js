'use strict';

describe('Utilities', function() {
  var Utilities;

  beforeEach(inject(function(_Utilities_) {
    Utilities = _Utilities_;
  }));

  it('calculates if you have majority parenting time', function() {
    var overnights = 273;
    expect(Utilities.youHaveMajority(overnights)).toBeTrue();
  });
});
