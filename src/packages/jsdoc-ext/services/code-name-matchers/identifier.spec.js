var matcherFactory = require('./identifier');

describe('Identifier matcher', function() {

  var matcher;

  beforeEach(function() {
    matcher = matcherFactory();
  });

  it("should return node name", function() {
    expect(matcher({
      name: "test"
    })).toEqual("test");

    expect(matcher({
      foo: "bar"
    })).toBeNull();
  });
});