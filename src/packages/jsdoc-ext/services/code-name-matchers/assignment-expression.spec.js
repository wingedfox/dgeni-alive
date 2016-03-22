var Dgeni = require('dgeni');
var mockPackage = require('../mocks/mockPackage');

describe('AssignmentExpression matcher', function() {

  var matcher, codeNameService;

  beforeEach(function() {
    var dgeni = new Dgeni([mockPackage()]);
    var injector = dgeni.configureInjector();
    matcher = injector.get('AssignmentExpressionNodeMatcher');
    codeNameService = injector.get('codeNameService');
    jsParser = injector.get('jsParser');
  });

  it("should return null for empty argument", function() {
    spyOn(codeNameService, 'find').and.returnValue(null);

    expect(matcher()).toBeNull();
    expect(matcher(null)).toBeNull();
    expect(codeNameService.find).not.toHaveBeenCalled();
  });

  it("should continue search for left part", function () {
    var expr = {
      left: 'test'
    };

    spyOn(codeNameService, 'find');

    expect(matcher(expr)).toBeNull();
    expect(codeNameService.find.calls.count()).toEqual(1);
    expect(codeNameService.find).toHaveBeenCalledWith('test');
  });

  it("should continue search with right part", function () {
    var expr = {
      left: null,
      right: 'test'
    };

    spyOn(codeNameService, 'find');

    expect(matcher(expr)).toBeNull();
    expect(codeNameService.find.calls.count()).toEqual(2);
    expect(codeNameService.find).toHaveBeenCalledWith(null, 'test');
  });
});