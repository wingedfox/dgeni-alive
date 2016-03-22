var matcherFactory = require('./member-expression');

describe('MemberExpression matcher', function() {

  var matcher, codeNameServiceMock;

  beforeEach(function() {
    codeNameServiceMock = {
      find: function (arg) {
        return arg;
      }
    };
    matcher = matcherFactory(codeNameServiceMock);
  });

  it("should return null for any argument", function() {
    expect(matcher()).toBeNull();
    expect(matcher(null)).toBeNull();
    expect(matcher({})).toBeNull();
  });
});