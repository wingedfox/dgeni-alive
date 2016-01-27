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
3. Configure web views
4. TBD: view live examples

Parts of code were taken from generator-ngdoc.

## What's done
1. Migrated to Angular 1.5
2. Added controller and factory templates
3. Added links to internal/external components and types to method params
4. Added api-index component to show title API page
5. Built-in docs server
6. TBD

## How it works
1. Configure Dgeni package
2. Append custom processors/templates/filters/etc
3. Run dgeni generator
4. Serve built app with your favorite server
5. ...
6. Profit

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

### Web-app configuration
Whether you need to change live docs appearance, feel free to override templates
- *[content.html](tree/master/src/templates/app/views/content.html]*
- *[footer.html](tree/master/src/templates/app/views/footer.html]*
- *[main.html](tree/master/src/templates/app/views/main.html]*
- *[navbar.html](tree/master/src/templates/app/views/navbar.html]*
- *[sidebar.html](tree/master/src/templates/app/views/sidebar.html]*

```js
docgen.package()  
  // add more templates location
  .config(function(templateFinder) {
    templateFinder.templateFolders.unshift('/path/to/templates');
  })
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
     basePath: '',
  // optional dgeni packages
  // packages: [
  //   'dgeni-packages/jsdoc',            // either names
  //   require('dgeni-packages/examples') // or packages
  // ]
  // optional serve section for running local http server with live docs
  // serve: {
  // the server port
  // can also be written as a function, e.g.
       port: 10000,
  // open the browser
       openBrowser: true // or command to run favorite browser
  // }
},
api: {
  // product title
  title: 'My Docs',
  // product version
  version: '<%= pkg.version %>',
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
