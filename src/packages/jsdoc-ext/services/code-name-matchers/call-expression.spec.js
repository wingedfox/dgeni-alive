var matcherFactory = require('./call-expression');

describe('CallExpression matcher', function() {

  var matcher, codeNameServiceMock;

  beforeEach(function() {
    codeNameServiceMock = {
      find: function (arg) {
        return arg;
      }
    };
    matcher = matcherFactory(codeNameServiceMock);
  });

  it("should look for name deeper in code", function() {
    spyOn(codeNameServiceMock, 'find').and.callThrough();

    expect(matcher({})).toBeNull();
    expect(matcher({
      callee: 'test'
    })).toEqual('test');
    expect(codeNameServiceMock.find.calls.count()).toEqual(2);
  });
});