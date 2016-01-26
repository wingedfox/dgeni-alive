var Dgeni = require('dgeni');
var Package = require('dgeni').Package;
var path = require('path');
var _ = require('lodash');
var fse = require('fs-extra');
var bower = require('bower');
var wiredep = require('wiredep');
var Q = require('q');

/**
 * Default packages, may be overridden by {@link DocGen#package}
 * @type {Array}
 */
var DEFAULT_PACKAGES = [
    require('dgeni-packages/ngdoc'),
    require('dgeni-packages/nunjucks'),
//    require('dgeni-packages/examples')
];

/**
 * Applies default package configuration, might be overridden later
 */
function configurePackage(p) {
    // append services
    p.factory(require('./services/getTypeLink'))
     .factory(require('./services/getTypeName'))

     // build navigation
     .processor(require('./processors/navigation'))
     .processor(require('./processors/structuredParam'))

     // change default url for native types doc
//     .config(function(getTypeLink) {
//        getTypeLink.nativeTypeRoot = 'http://w3.org';
//      })

     .config(function(templateEngine, getInjectables) {
        templateEngine.filters = templateEngine.filters.concat(getInjectables([
          require('./rendering/filters/keys'),
          require('./rendering/filters/type-link'),
          require('./rendering/filters/type-name')
        ]));
      })

     // add more templates location
     .config(function(templateFinder) {
        templateFinder.templateFolders.unshift(path.resolve(__dirname, 'templates'));
      })

     // do not assume links to be 
     .config(function(checkAnchorLinksProcessor) {
        checkAnchorLinksProcessor.base = '/';
      })

     .config(function(parseTagsProcessor, getInjectables) {
        getInjectables(require('./tag-defs')).forEach(function(v) {
            parseTagsProcessor.tagDefinitions.push(v);
        });
     })

     // setting readFilesProcessor configuration
     .config(function(computePathsProcessor, computeIdsProcessor, createDocMessage, getAliases) {
        computeIdsProcessor.idTemplates.push({
            docTypes: ['overview'],
            getId: function (doc) {
                return doc.fileInfo.baseName;
            },
            getAliases: function (doc) {
                return [doc.id];
            }
        });

        computeIdsProcessor.idTemplates.push({
            docTypes: ['controller'],
                idTemplate: 'module:${module}.${docType}:${name}',
                getAliases: getAliases
            });

        computeIdsProcessor.idTemplates.push({
            docTypes: ['factory'],
            idTemplate: 'module:${module}.${docType}:${name}',
            getAliases: getAliases
        });

        computePathsProcessor.pathTemplates.push({
            docTypes: ['controller'],
            pathTemplate: '${area}/${module}/${docType}/${name}',
            outputPathTemplate: 'partials/${area}/${module}/${docType}/${name}.html'
        });

        computePathsProcessor.pathTemplates.push({
            docTypes: ['factory'],
            pathTemplate: '${area}/${module}/${docType}/${name}',
            outputPathTemplate: 'partials/${area}/${module}/${docType}/${name}.html'
        });

        computePathsProcessor.pathTemplates.push({
            docTypes: ['module'],
            getPath: function (doc) {
                return doc.area + '/' + doc.name;
            },
            outputPathTemplate: 'partials/${path}.html'
        });

        computePathsProcessor.pathTemplates.push({
            docTypes: ['overview'],
            getPath: function(doc) {
                var docPath = path.dirname(doc.fileInfo.relativePath);
                if (doc.fileInfo.baseName !== 'index') {
                    docPath = path.join(docPath,
                        doc.fileInfo.baseName);
                } else {
                    return 'index';
                }
                return docPath;
            },
            outputPathTemplate: 'partials/${path}.html'
        });

        computePathsProcessor.pathTemplates.push({
            docTypes: ['componentGroup'],
            pathTemplate: '${area}/${moduleName}/${groupType}',
            outputPathTemplate: 'partials/${area}/${moduleName}/${groupType}.html'
        });
    });

    return p;
}

function DocGen () {
    var pkg;
    var dest;

    /**
     * Builds package and returns instance
     * @returns {Package} package instance singleton
     */
    this.package = function (p) {
        if (!pkg) {
            var packages = (p && [].concat(p) || DEFAULT_PACKAGES || []).map(function(packageName) {
                if ('string' == typeof packageName) {
                    return require(packageName);
                } else {
                    return packageName;
                }
            });
            pkg = configurePackage(new Package('grunt-dgeni', packages));
        }
        return pkg;
    }

    /**
     * Appends sources to process
     *
     * @param {String, Array} src - file sources
     * @param {String} basepath - path to sources
     * @returns {DocGen}
     */
    this.src = function (src, basepath) {
        this.package().config(function(readFilesProcessor) {
            readFilesProcessor.basePath = path.resolve(basepath || '');

            readFilesProcessor.sourceFiles = (readFilesProcessor.sourceFiles || []).concat([].concat(src.map(function(sourceInfo) {
                return {
                    include: sourceInfo,
                };
            })));
        });
        return this;
    }

    /**
     * Sets destination path
     * @param {String} p
     * @returns {DocGen}
     */
    this.dest = function (p) {
        dest = path.resolve(p);
        this.package().config(function(writeFilesProcessor) {
            writeFilesProcessor.outputFolder = dest;
        });
        return this;
    }

    /**
     * Runs generator
     * @returns {Promise}
     */
    this.generate = function () {
        return new Dgeni([this.package()]).generate().then(function(data) {
            var defer = Q.defer();

            // copy app data
            console.log('Copy everything from' + path.join(__dirname, 'app') + ' to ' + dest);
            fse.copySync(path.join(__dirname, 'app'), dest);

            // provide bower deps
            process.chdir(dest);
            var z = bower.commands.install([],{});

            z.on('end', function(){
                defer.resolve(data);
            });

            z.on('error', function (err) {
                defer.reject(err);
            });

            // wiredep
            return defer.promise.then(function(data) {
                wiredep({
                    src: ['index.html']
                });
                return data;
            });
        });
    }
}
/**
 * @returns generator instance
 */
module.exports = function() {
    return new DocGen();
}
