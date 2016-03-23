var filterFactory = require('./type-name');

describe("type-name filter", function() {
  it("should call getTypeName", function() {
    var getTypeLinkSpy = jasmine.createSpy('getTypeName');
    var filter = filterFactory(getTypeLinkSpy);

    filter.process('object');
    expect(getTypeLinkSpy).toHaveBeenCalled();
  });
});