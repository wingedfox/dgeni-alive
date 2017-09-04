# dgeni-alive
Live docs on top of dgeni documentation generator

[ [FAQ](https://github.com/wingedfox/dgeni-alive/wiki/FAQ) ] [ [HowTo](https://github.com/wingedfox/dgeni-alive/wiki/HowTo) ]

## Motivation
`Dgeni-alive` documentation generator has been built after a long search for working one with AngularJS doc flavour.

1. [ngdocs](//github.com/idanush/ngdocs) ([grunt-ngdoc](//github.com/bevacqua/grunt-ngdoc), [grunt-ngdocs](//github.com/m7r/grunt-ngdocs), etc) - has no updates for a long time
2. [docular](//grunt-docular.com/) - has no activity as well
3. [generator-ngdoc](//github.com/Quramy/generator-ngdoc) - has no activity as well and forces to use Yeoman tools, is not suitable for CI
4. [sia](//github.com/boundstate/sia) - really good one, but it likes Gulp and does not provide standalone extensible generator

With dgeni-alive you can

1. Use docgen as grunt task and directly
2. Extend docgen like native Dgeni package
3. Configure web views
4. TBD: view live examples

Parts of code were taken from generator-ngdoc.

## Demo Projects
1. [angular-route-segment](http://wingedfox.github.io/dgeni-alive/docs/angular-route-segment/), [sources](https://github.com/wingedfox/angular-route-segment/blob/master/src/)
2. [angular-gettext](http://wingedfox.github.io/dgeni-alive/docs/angular-gettext/), [sources](https://github.com/wingedfox/angular-gettext/blob/master/src/)
3. TBD

## What's Done
1. Migrated to Angular 1.5
2. Added controller and factory templates
3. Added links to internal/external components and types to method params
4. Added api-index component to show title API page
5. Added @deprecated, @since and @access tags
6. Built-in docs server
7. Added Errors Reference
8. Added Search
9. Added @sortOrder tag
10. Added JSX reader and @ngdoc type 'React' for documenting React components.
11. TBD

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
  packages: [
    'dgeni-packages/jsdoc',            // either names
    require('dgeni-packages/examples') // or packages
  ]
  // optional serve section for running local http server with live docs
  serve: {
    // the server port
    // can also be written as a function, e.g.
    port: 10000,
    // open the browser
    openBrowser: true // or command to run favorite browser
  }
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
  // grunt globbing is supported
  src: [
    '/src/**/*.js',
    '!**/test/**/*.js'
  ],
  // Any paths that contain your overriden templates relative to the grunt file
  templatePaths: [
    'dgeniAliveTemplates'
  ]
}
```

## Setting up Live Examples
Add the dgeni-packages examples package to your package array.
If you want the "Edit in Plunker" button and file tabs also add dgeni-alive examples-ext.
Your package array should look something like this:
```
packages: [
	'dgeni-packages/ngdoc',
	'dgeni-packages/examples',
	'./packages/examples-ext',
],
```
You will also need to add deployments configuration to generate the examples.
This is added to the "options" section of the configuration.
```
deployments: [{
	name: 'default',
	examples: {
		commonFiles: {
			scripts: [
				'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js',
				'docs/resources/js/examples.js'
			],
			stylesheets: []
		}
	}
}],
deploymentTarget: 'default'
```
This example configuration defines a deployment "default" and makes it the default target.
It tells every example to include jquery and a js file relative to the build path called "examples.js".
Paths that do not begin with http(s), // or / will be copied automatically in the same place as the generated example html if you use "examples-ext" package.
You could also specify stylesheets in the stylesheets array.

### Configuring iFrame-Resizer
iFrame-Resizer (https://github.com/davidjbradshaw/iframe-resizer) is used to resize example iframes when "examples-ext" is used.
The following options for iframe resizer may be specified as example attributes (see iframe-resizer readme for explainations of what they do):
log, minHeight, maxHeight, heightCalculationMethod, scrolling, tolerance.
Options are set as attributes in your example tag in the documentation as snake-case with frame- prefixed before the option name.
This is an example of setting minHeight to 200:
```
 * <example module="myModule" name="myExample" frame-min-height="200">
```
If you wish to disable iframe-resizer for an example add `frame-no-resize="true"` to your example.

## Additional Packages
dgeni-alive provides several packages to supplement the default dgeni-packages.
To include a package from dgeni-alive in grunt configuration you would add `./packages/{package-name}` to you packages array.
* examples-ext: provides improvements to the live examples
* jsdoc-ext: provides additional jsdoc tags and code expressions (included by default)
* jsx: provides jsx support
* links-ext: provides extensions to dgeni-packages/links (included by default)
* ngdoc-ext: provides extensions to dgeni-packages/ngdoc (included by default)
* website: website package (included by default)

## License
MIT
