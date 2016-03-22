var matcherFactory = require('./variable-declarator');

describe('VariableDeclarator matcher', function() {

  var matcher;

  beforeEach(function() {
    var dgeni = new Dgeni([mockPackage()]);
    var injector = dgeni.configureInjector();
    matcher = injector.get('ArrayExpressionNodeMatcher');
  });

  it("should return null if value is not supported", function() {
    expect(matcher()).toBeNull();
    expect(matcher(null)).toBeNull();
    expect(matcher({
      id: null
    })).toBeNull();
    expect(matcher({
      id: {}
    })).toBeNull();
    expect(matcher({
      id: {
        name: null
      }
    })).toBeNull();
    expect(matcher({
      id: {
        name: ""
      }
    })).toBeNull();
  });

  it("should return function name", function() {
    expect(matcher({
      id: {
        name: "test"
      }
    })).toEqual("test");
  });
});