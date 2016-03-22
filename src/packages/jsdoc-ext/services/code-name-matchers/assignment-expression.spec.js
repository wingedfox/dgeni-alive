var matcherFactory = require('./assignment-expression');

describe('AssignmentExpression matcher', function() {

  var matcher, codeNameServiceMock;

  beforeEach(function() {
    codeNameServiceMock = {
      find: function (arg) {
        return arg;
      }
    };
    matcher = matcherFactory(codeNameServiceMock);
  });

  it("should start search for right part", function () {
    var expr = {
      left: 'left',
      right: 'right'
    };

    spyOn(codeNameServiceMock, 'find').and.callThrough();

    expect(matcher(expr)).toEqual(expr.right);
    expect(codeNameServiceMock.find.calls.count()).toEqual(1);
    expect(codeNameServiceMock.find).toHaveBeenCalledWith(expr.right);
  });

  it("should continue search with left part", function () {
    codeNameServiceMock.value = null;
    var expr = {
      left: 'test',
      right: null
    };

    spyOn(codeNameServiceMock, 'find').and.callThrough();

    expect(matcher(expr)).toEqual('test');
    expect(codeNameServiceMock.find.calls.count()).toEqual(2);
    expect(codeNameServiceMock.find).toHaveBeenCalledWith(null);
    expect(codeNameServiceMock.find).toHaveBeenCalledWith('test');
  });

  it("should return null for undefined left and right", function () {
    codeNameServiceMock.value = null;
    var expr = {
      left: null,
      right: null
    };

    spyOn(codeNameServiceMock, 'find').and.callThrough();

    expect(matcher(expr)).toEqual(null);
    expect(codeNameServiceMock.find.calls.count()).toEqual(2);
    expect(codeNameServiceMock.find.calls.allArgs()).toEqual([[null],[null]]);;
  });
});