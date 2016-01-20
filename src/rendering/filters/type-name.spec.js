var filterFactory = require('./type-name');

describe("type-name filter", function() {
  it("should call getTypeName", function() {
    var getTypeLinkSpy = jasmine.createSpy('getTypeName');
    var filter = filterFactory(getTypeNameSpy);

    filter.process('object');
    expect(getTypeNameSpy).toHaveBeenCalled();
  });
});