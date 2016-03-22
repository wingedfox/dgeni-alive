var matcherFactory = require('./expression-statement');

describe('ExpressionStatement matcher', function() {

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
      expression: 'test'
    })).toEqual('test');
    expect(codeNameServiceMock.find.calls.count()).toEqual(2);
  });
});