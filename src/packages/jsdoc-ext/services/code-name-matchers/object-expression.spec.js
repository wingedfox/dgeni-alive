var matcherFactory = require('./object-expression');

describe('ObjectExpression matcher', function() {

  var matcher;

  beforeEach(function() {
    var dgeni = new Dgeni([mockPackage()]);
    var injector = dgeni.configureInjector();
    matcher = injector.get('ArrayExpressionNodeMatcher');
  });

  it("should return null for any argument", function() {
    expect(matcher({})).toBeNull();
  });
});