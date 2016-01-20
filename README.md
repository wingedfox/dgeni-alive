# dgeni-alive
Live docs on top of dgeni documentation generator

## Motivation
Dgeni-alive documentation generator has been built after a long search for a documentation generator.

1. [ngdocs](//github.com/idanush/ngdocs) ([grunt-ngdoc](//github.com/bevacqua/grunt-ngdoc), [grunt-ngdocs](//github.com/m7r/grunt-ngdocs), etc) - has no updates for a long time
2. [docular](//grunt-docular.com/) - has no activity as well
3. [generator-ngdoc](//github.com/Quramy/generator-ngdoc) - has no activity as well and forces to use Yeoman tools, is not suitable for CI

With dgeni-alive you can

1. Use docgen as grunt task and directly
2. Extend docgen like native Dgeni package
3. TBD: configure web views
4. TBD: view live examples

Parts of code were taken from generator-ngdoc.

## What's done
1. Migrated to Angular 1.5
2. Added controller and factory templates
3. Added links to internal/external components and types to method params
4. TBD

## How it works
1. Configure Dgeni package
2. Append custom processors/templates/filters/etc
3. Run dgeni generator
4. Serve built app with your favorite server
4. ...
5. Profit

## How to use
### Install
```
npm install dgeni-alive --save-dev
```

### API
```js
var docgen = require('../scr/docgen')();
docgen.package().config(function(log) {
    log.level = 'info';
})
.src(this.filesSrc);
.dest(this.data.dest);
.generate().then(function(){
  console.log("I'm done!");
});

```
### Grunt task
Load task
```js
grunt.loadNpmTasks('dgeni-alive');
```

Add section to your Gruntfile.js
```
"dgeni-alive": {
options: {
  // optional basePath for correct path calculation
  // basePath: '',
  // optional dgeni packages
  // packages: [
  //   'dgeni-packages/jsdoc',
  //   require('dgeni-packages/examples')
  //]
},
api: {
  // do not expand paths
  expand: false,
  // where to put docs
  dest: '/docs/',
  // where to look for sources
  src: [
    '/src/**/*.js',
    '!**/test/**/*.js'
  ]
}
```

## License
MIT