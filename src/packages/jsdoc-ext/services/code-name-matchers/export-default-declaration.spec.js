var Dgeni = require('dgeni');
var mockPackage = require('../mocks/mockPackage');

describe('ArrayExpression matcher', function() {

  var matcher;

  beforeEach(function() {
    var dgeni = new Dgeni([mockPackage()]);
    var injector = dgeni.configureInjector();
    matcher = injector.get('ArrayExpressionNodeMatcher');
  });

  it("should return null for any argument", function() {
    expect(matcher()).toBeNull();
    expect(matcher(null)).toBeNull();
    expect(matcher({})).toBeNull();
  });
});