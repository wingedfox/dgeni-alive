(function(angular) {
  'use strict';
/**
 * @ngdoc module
 * @name gettext
 * @module gettext
 * @packageName angular-gettext
 * @description Super simple Gettext for Angular.JS
 *
 * A sample application can be found at https://github.com/rubenv/angular-gettext-example.
 * This is an adaptation of the [TodoMVC](http://todomvc.com/) example. You can use this as a guideline while adding <a href="api/gettext">angular-gettext</a> to your own application.
 */
/**
 * @ngdoc factory
 * @module gettext
 * @name gettextPlurals
 * @param {String} [langCode=en] language code
 * @param {Number} [n=0] number to calculate form for
 * @returns {Number} plural form number
 * @description Provides correct plural form id for the given language
 *
 * Example
 * ```js
 * gettextPlurals('ru', 10); // 1
 * gettextPlurals('en', 1);  // 0
 * gettextPlurals();         // 1
 * ```
 */
angular.module('gettext', [])
/**
 * @ngdoc function
 * @module gettext
 * @name gettext
 * @param {String} str annotation key
 * @description Gettext constant function for annotating strings.
 *
 * This function does nothing but it is used by [angular-gettext-tools](https://github.com/rubenv/angular-gettext-tools) for building of a list of strings <a href="guide/annotate">annotated</a> in JavaScript code.
 *
 * ```js
 * angular.module('myApp', ['gettext']).config(function(gettext) {
 *   /// MyApp document title
 *   gettext('my-app.title');
 *   ...
 * })
 * ```
 */
.constant('gettext', function gettext(str) {
    /*
     * Does nothing, simply returns the input string.
     *
     * This function serves as a marker for `grunt-angular-gettext` to know that
     * this string should be extracted for translations.
     */
    return str;
});

/**
 * @ngdoc factory
 * @module gettext
 * @name gettextCatalog
 * @requires gettextPlurals
 * @requires gettextFallbackLanguage
 * @requires ng.service.$http
 * @requires ng.service.$cacheFactory
 * @requires ng.service.$interpolate
 * @requires ng.type.$rootScope.Scope
 * @description Provides set of method to translate stings
 * @example
 * This example shows translations behaviour with different settings.
  <example module="gettextExample" name="gettextExample">
    <file name="index.html">
      <div ng-controller="GettextController as gtx">
        <section class="left">
          <label>
            <span>Translation:</span>
            <select
              aria-label="current language"
              ng-model="gtx.options.currentLanguage"
              ng-change="gtx.options.setCurrentLanguage(gtx.options.currentLanguage)">
              <option ng-repeat="(k, lang) in gtx.options.strings" value="{{k}}">{{k}}</option>
            </select>
          </label>
          <label>
          <span>Debug mode:</span>
            <input type="checkbox"
              ng-model="gtx.options.debug"
              ng-change="gtx.update()"
              aria-label="debug mode"/></label>
          <label>
            <span>Debug prefix:</span>
            <input type="text"
              ng-model="gtx.options.debugPrefix"
              ng-change="gtx.update()"
              placeholder="non-translated string prefix"
              aria-label="debug prefix for untranslated strings" /></label>
          <label>
            <span>Show translated markers:</span>
            <input type="checkbox"
              ng-model="gtx.options.showTranslatedMarkers"
              ng-change="gtx.update()"
              aria-label="debug mode" /></label>
          <label>
            <span>Translated marker prefix:</span>
            <input type="text"
              ng-model="gtx.options.translatedMarkerPrefix"
              ng-change="gtx.update()"
              placeholder="translated string prefix"
              aria-label="translated strings prefix for debug mode" /></label>
          <label>
            <span>Translated marker suffix:</span>
            <input type="text"
              ng-model="gtx.options.translatedMarkerSuffix"
              ng-change="gtx.update()"
              placeholder="translated string suffix"
              aria-label="translated strings prefix for debug mode" /></label>
        </section>
        <section class="right">
          <label>
            <span>Your name:</span>
            <input type="text" ng-model="gtx.name" placeholder="enter your name" aria-label="your name"/></label>
          <label>
            <span>"Hello" string</span>
            <input type="text"
              ng-change="gtx.update()"
              ng-model="gtx.options.strings[gtx.options.currentLanguage]['Hi, \{\{gtx.name\}\}!'].$$noContext[0]" placeholder="{{'Hi, {{gtx.name}\}!'}}" aria-label="Hello string"/></label>
          <label>
            <span>"Bye" string</span>
            <input type="text"
              ng-change="gtx.update()"
              ng-model="gtx.options.strings[gtx.options.currentLanguage]['Bye, \{\{gtx.name\}\}!'].$$noContext[0]" placeholder="{{'Bye, {{gtx.name}\}!'}}" aria-label="Bye string"/></label>
        </section>
        <ul>
          <li class="translation">
            <span>Translation: {{gtx.options.currentLanguage}}</span>
            <ul>
              <li>
                <span translate>Hi, {{gtx.name}}!</span>
              </li>
              <li>
                <span translate>Bye, {{gtx.name}}!</span>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </file>
    <file name="script.js">
      angular.module('gettextExample', ['gettext']).controller('GettextController', function($scope, gettextCatalog) {
        gettextCatalog.debug = true;
        gettextCatalog.showTranslatedMarkers = true;
        gettextCatalog.translatedMarkerPrefix = '->';
        gettextCatalog.translatedMarkerSuffix = '<-';
        gettextCatalog.currentLanguage = 'nl';
        gettextCatalog.setStrings('en-US', {
          'Hi, {{gtx.name}}!': 'Hello, {{gtx.name}}!',
          'Bye, {{gtx.name}}!': '',
        });
        gettextCatalog.setStrings('es-ES', {
          'Hi, {{gtx.name}}!': '',
          'Bye, {{gtx.name}}!': '¡Adious, {{gtx.name}}!',
        })
        gettextCatalog.setStrings('nl', {
          'Hi, {{gtx.name}}!': 'Halo, {{gtx.name}}!',
          'Bye, {{gtx.name}}!': 'Doei, {{gtx.name}}!',
        });

        this.name = 'Ruben';
        this.options = gettextCatalog;

        this.update = function () {
          // a kind of hack, service settings are not tracked for real time changes
          $scope.$root.$broadcast('gettextLanguageChanged');
        }
      });
    </file>
    <file name="style.css">
      select,
      input[type=text] {
          width: 200px;
      }
      .translation {
        display: inline-block;
        list-style: none;
      }
      label {
        display: block;
      }
      label > span {
        display: inline-block;
        width: 250px;
      }
      section {
        display: inline-block;
        padding: 5px;
      }
      section.right > label > span {
        width: 120px;
      }
    </file>
    </example>
 */
angular.module('gettext').factory('gettextCatalog', ["gettextPlurals", "gettextFallbackLanguage", "$http", "$cacheFactory", "$interpolate", "$rootScope", function gettextCatalog(gettextPlurals, gettextFallbackLanguage, $http, $cacheFactory, $interpolate, $rootScope) {
    var catalog;
    var noContext = '$$noContext';

    // IE8 returns UPPER CASE tags, even though the source is lower case.
    // This can causes the (key) string in the DOM to have a different case to
    // the string in the `po` files.
    // IE9, IE10 and IE11 reorders the attributes of tags.
    var test = '<span id="test" title="test" class="tested">test</span>';
    var isHTMLModified = (angular.element('<span>' + test + '</span>').html() !== test);

    function prefixDebug(string) {
        if (catalog.debug && catalog.currentLanguage !== catalog.baseLanguage) {
            return catalog.debugPrefix + string;
        } else {
            return string;
        }
    }

    function addTranslatedMarkers(string) {
        if (catalog.showTranslatedMarkers) {
            return catalog.translatedMarkerPrefix + string + catalog.translatedMarkerSuffix;
        } else {
            return string;
        }
    }

    function broadcastUpdated() {
        /**
         * @ngdoc event
         * @name gettextCatalog#gettextLanguageChanged
         * @eventType broadcast on $rootScope
         * @description Fires language change notification without any additional parameters.
         */
        $rootScope.$broadcast('gettextLanguageChanged');
    }

    catalog = {
        /**
         * @ngdoc property
         * @name gettextCatalog#debug
         * @public
         * @type {Boolean} false
         * @see gettextCatalog#debug
         * @description Whether or not to prefix untranslated strings with `[MISSING]:` or a custom prefix.
         */
        debug: false,
        /**
         * @ngdoc property
         * @name gettextCatalog#debugPrefix
         * @public
         * @type {String} [MISSING]:
         * @description Custom prefix for untranslated strings when <a href="api/gettext/factory/gettextCatalog#debug">gettextCatalog#debug</a> set to `true`.
         */
        debugPrefix: '[MISSING]: ',
        /**
         * @ngdoc property
         * @name gettextCatalog#showTranslatedMarkers
         * @public
         * @type {Boolean} false
         * @description Whether or not to wrap all processed text with markers.
         *
         * Example output: `[Welcome]`
         */
        showTranslatedMarkers: false,
        /**
         * @ngdoc property
         * @name gettextCatalog#translatedMarkerPrefix
         * @public
         * @type {String} [
         * @description Custom prefix to mark strings that have been run through <a href="api/gettext">angular-gettext</a>.
         */
        translatedMarkerPrefix: '[',
        /**
         * @ngdoc property
         * @name gettextCatalog#translatedMarkerSuffix
         * @public
         * @type {String} ]
         * @description Custom suffix to mark strings that have been run through <a href="api/gettext">angular-gettext</a>.
         */
        translatedMarkerSuffix: ']',
        /**
         * @ngdoc property
         * @name gettextCatalog#strings
         * @private
         * @type {Object}
         * @description An object of loaded translation strings. Shouldn't be used directly.
         */
        strings: {},
        /**
         * @ngdoc property
         * @name gettextCatalog#baseLanguage
         * @protected
         * @deprecated
         * @since 2.0
         * @type {String} en
         * @description The default language, in which you're application is written.
         *
         * This defaults to English and it's generally a bad idea to use anything else:
         * if your language has different pluralization rules you'll end up with incorrect translations.
         */
        baseLanguage: 'en',
        /**
         * @ngdoc property
         * @name gettextCatalog#currentLanguage
         * @public
         * @type {String}
         * @description Active language.
         */
        currentLanguage: 'en',
        /**
         * @ngdoc property
         * @name gettextCatalog#cache
         * @public
         * @type {String} en
         * @description Language cache for lazy load
         */
        cache: $cacheFactory('strings'),

        /**
         * @ngdoc method
         * @name gettextCatalog#setCurrentLanguage
         * @public
         * @param {String} lang language name
         * @description Sets the current language and makes sure that all translations get updated correctly.
         */
        setCurrentLanguage: function (lang) {
            this.currentLanguage = lang;
            broadcastUpdated();
        },

        /**
         * @ngdoc method
         * @name gettextCatalog#getCurrentLanguage
         * @public
         * @returns {String} current language
         * @description Returns the current language.
         */
        getCurrentLanguage: function () {
            return this.currentLanguage;
        },

        /**
         * @ngdoc method
         * @name gettextCatalog#setStrings
         * @public
         * @param {String} language language name
         * @param {Object.<String>} strings set of strings where the key is the translation `key` and `value` is the translated text
         * @description Processes an object of string definitions. <a href="guide/manual-setstrings">More details here</a>.
         */
        setStrings: function (language, strings) {
            if (!this.strings[language]) {
                this.strings[language] = {};
            }

            for (var key in strings) {
                var val = strings[key];

                if (isHTMLModified) {
                    // Use the DOM engine to render any HTML in the key (#131).
                    key = angular.element('<span>' + key + '</span>').html();
                }

                if (angular.isString(val) || angular.isArray(val)) {
                    // No context, wrap it in $$noContext.
                    var obj = {};
                    obj[noContext] = val;
                    val = obj;
                }

                // Expand single strings for each context.
                for (var context in val) {
                    var str = val[context];
                    val[context] = angular.isArray(str) ? str : [str];
                }
                this.strings[language][key] = val;
            }

            broadcastUpdated();
        },

        /**
         * @ngdoc method
         * @name gettextCatalog#getStringFormFor
         * @protected
         * @param {String} language language name
         * @param {String} string translation key
         * @param {Number=} n number to build sting form for
         * @param {String=} context translation key context, e.g. <a href="docs/context">Verb, Noun</a>
         * @returns {String|Null} translated or annotated string or null if language is not set
         * @description Translate a string with the given language, count and context.
         */
        getStringFormFor: function (language, string, n, context) {
            if (!language) {
                return null;
            }
            var stringTable = this.strings[language] || {};
            var contexts = stringTable[string] || {};
            var plurals = contexts[context || noContext] || [];
            return plurals[gettextPlurals(language, n)];
        },

        /**
         * @ngdoc method
         * @name gettextCatalog#getString
         * @public
         * @param {String} string translation key
         * @param {ng.type.$rootScope.Scope=} scope scope to do interpolation against
         * @param {String=} context translation key context, e.g. <a href="docs/context">Verb, Noun</a>
         * @returns {String} translated or annotated string
         * @description Translate a string with the given scope and context.
         *
         * First it tries <a href="api/gettext/factory/gettextCatalog#currentLanguage">gettextCatalog#currentLanguage</a> (e.g. `en-US`) then <a href="api/gettext/factory/gettextFallbackLanguage">fallback</a> (e.g. `en`).
         *
         * When `scope` is supplied it uses Angular.JS interpolation, so something like this will do what you expect:
         * ```js
         * var hello = gettextCatalog.getString("Hello {{name}}!", { name: "Ruben" });
         * // var hello will be "Hallo Ruben!" in Dutch.
         * ```
         * Avoid using scopes - this skips interpolation and is a lot faster.
         */
        getString: function (string, scope, context) {
            var fallbackLanguage = gettextFallbackLanguage(this.currentLanguage);
            string = this.getStringFormFor(this.currentLanguage, string, 1, context) ||
                     this.getStringFormFor(fallbackLanguage, string, 1, context) ||
                     prefixDebug(string);
            string = scope ? $interpolate(string)(scope) : string;
            return addTranslatedMarkers(string);
        },

        /**
         * @ngdoc method
         * @name gettextCatalog#getPlural
         * @public
         * @param {Number} n number to build sting form for
         * @param {String} string translation key
         * @param {String} stringPlural plural translation key
         * @param {ng.type.$rootScope.Scope=} scope scope to do interpolation against
         * @param {String=} context translation key context, e.g. <a href="docs/context">Verb, Noun</a>
         * @returns {String} translated or annotated string
         * @see <a href="api/gettext/factory/gettextCatalog#getString">gettextCatalog#getString</a> for details
         * @description Translate a plural string with the given context.
         */
        getPlural: function (n, string, stringPlural, scope, context) {
            var fallbackLanguage = gettextFallbackLanguage(this.currentLanguage);
            string = this.getStringFormFor(this.currentLanguage, string, n, context) ||
                     this.getStringFormFor(fallbackLanguage, string, n, context) ||
                     prefixDebug(n === 1 ? string : stringPlural);
            if (scope) {
                scope.$count = n;
                string = $interpolate(string)(scope);
            }
            return addTranslatedMarkers(string);
        },

        /**
         * @ngdoc method
         * @name gettextCatalog#loadRemote
         * @public
         * @param {String} url location of the translations
         * @description Load a set of translation strings from a given URL.
         *
         * This should be a JSON catalog generated with [angular-gettext-tools](https://github.com/rubenv/angular-gettext-tools).
         * <a href="guide/lazy-loading">More details here</a>.
         */
        loadRemote: function (url) {
            return $http({
                method: 'GET',
                url: url,
                cache: catalog.cache
            }).then(function (response) {
                var data = response.data;
                for (var lang in data) {
                    catalog.setStrings(lang, data[lang]);
                }
                return response;
            });
        }
    };

    return catalog;
}]);

/**
 * @ngdoc directive
 * @module gettext
 * @name translate
 * @requires gettextCatalog
 * @requires https://docs.angularjs.org/api/ng/service/$parse $parse
 * @requires https://docs.angularjs.org/api/ng/service/$animate $animate
 * @requires https://docs.angularjs.org/api/ng/service/$compile $compile
 * @requires https://docs.angularjs.org/api/ng/service/$window $window
 * @restrict AE
 * @param {Boolean} translate node value is used as a translation key
 * @param {String=} translatePlural plural form
 * @param {Number=} translateN value to watch to substitute correct plural form
 * @param {String=} translateContext context value, e.g. <a href="docs/context">Verb, Noun</a>
 * @throws {Error} MissingPlural <a href="error/gettext/MissingPlural">MissingPlural</a> for malformed plurals
 * @description Annotates and translates text inside directive
 *
 * Full interpolation support is available in translated strings, so the following will work as expected:
 * ```js
 * <div translate>Hello {{name}}!</div>
 * ```
 */
angular.module('gettext').directive('translate', ["gettextCatalog", "$parse", "$animate", "$compile", "$window", function (gettextCatalog, $parse, $animate, $compile, $window) {
    // Trim polyfill for old browsers (instead of jQuery)
    // Based on AngularJS-v1.2.2 (angular.js#620)
    var trim = (function () {
        if (!String.prototype.trim) {
            return function (value) {
                return (typeof value === 'string') ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value;
            };
        }
        return function (value) {
            return (typeof value === 'string') ? value.trim() : value;
        };
    })();


    /**
     * @ngdoc error
     * @module gettext
     * @error
     * @type Error
     * @name MissingPlural
     * @description Error is thrown when either `translate-n` or `translate-plural` attribute is not present
     *
     * Plural translation requires the both of these attributes to be defined in order to provide correct
     * strings.
     *
     * Example
     * ```html
     *  <span translate-plural="{{count}} ducks"
     *        translate-n="{{count}}"
     *        translate>{{count}} duck</span>
     * ```
     */
    function assert(condition, missing, found) {
        if (!condition) {
            throw new Error('You should add a ' + missing + ' attribute whenever you add a ' + found + ' attribute.');
        }
    }

    var msie = parseInt((/msie (\d+)/.exec(angular.lowercase($window.navigator.userAgent)) || [])[1], 10);

    return {
        restrict: 'AE',
        terminal: true,
        compile: function compile(element, attrs) {
            // Validate attributes
            assert(!attrs.translatePlural || attrs.translateN, 'translate-n', 'translate-plural');
            assert(!attrs.translateN || attrs.translatePlural, 'translate-plural', 'translate-n');

            var msgid = trim(element.html());
            var translatePlural = attrs.translatePlural;
            var translateContext = attrs.translateContext;

            if (msie <= 8) {
                // Workaround fix relating to angular adding a comment node to
                // anchors. angular/angular.js/#1949 / angular/angular.js/#2013
                if (msgid.slice(-13) === '<!--IE fix-->') {
                    msgid = msgid.slice(0, -13);
                }
            }

            return {
                post: function (scope, element, attrs) {
                    var countFn = $parse(attrs.translateN);
                    var pluralScope = null;
                    var linking = true;

                    function update() {
                        // Fetch correct translated string.
                        var translated;
                        if (translatePlural) {
                            scope = pluralScope || (pluralScope = scope.$new());
                            scope.$count = countFn(scope);
                            translated = gettextCatalog.getPlural(scope.$count, msgid, translatePlural, null, translateContext);
                        } else {
                            translated = gettextCatalog.getString(msgid,  null, translateContext);
                        }

                        var oldContents = element.contents();

                        if (oldContents.length === 0){
                            return;
                        }

                        // Avoid redundant swaps
                        if (translated === trim(oldContents.html())){
                            // Take care of unlinked content
                            if (linking){
                                $compile(oldContents)(scope);
                            }
                            return;
                        }

                        // Swap in the translation
                        var newWrapper = angular.element('<span>' + translated + '</span>');
                        $compile(newWrapper.contents())(scope);
                        var newContents = newWrapper.contents();

                        $animate.enter(newContents, element);
                        $animate.leave(oldContents);
                    }

                    if (attrs.translateN) {
                        scope.$watch(attrs.translateN, update);
                    }

                    /**
                     * @ngdoc event
                     * @name directive:translate#gettextLanguageChanged
                     * @eventType listen on scope
                     * @description Listens for language updates and changes translation accordingly
                     */
                    scope.$on('gettextLanguageChanged', update);

                    update();
                    linking = false;
                }
            };
        }
    };
}]);

/**
 * @ngdoc factory
 * @module gettext
 * @name gettextFallbackLanguage
 * @param {String} langCode language code
 * @returns {String|Null} fallback language
 * @description Strips regional code and returns language code only
 *
 * Example
 * ```js
 * gettextFallbackLanguage('ru');     // "null"
 * gettextFallbackLanguage('en_GB');  // "en"
 * gettextFallbackLanguage();         // null
 * ```
 */
angular.module("gettext").factory("gettextFallbackLanguage", function () {
    var cache = {};
    var pattern = /([^_]+)_[^_]+$/;

    return function (langCode) {
        if (cache[langCode]) {
            return cache[langCode];
        }

        var matches = pattern.exec(langCode);
        if (matches) {
            cache[langCode] = matches[1];
            return matches[1];
        }

        return null;
    };
});
/**
 * @ngdoc filter
 * @module gettext
 * @name translate
 * @requires gettextCatalog
 * @param {String} input translation key
 * @param {String} context context to evaluate key against
 * @returns {String} translated string or annotated key
 * @see <a href="docs/context">Verb, Noun</a>
 * @description Takes key and returns string
 *
 * Sometimes it's not an option to use an attribute (e.g. when you want to annotate an attribute value).
 * There's a `translate` filter available for this purpose.
 *
 * ```html
 * <input type="text" placeholder="{{'Username'|translate}}" />
 * ```
 * This filter does not support plural strings.
 *
 * You may want to use <a href="guide/custom-annotations">custom annotations</a> to avoid using the `translate` filter all the time.
 */
angular.module('gettext').filter('translate', ["gettextCatalog", function (gettextCatalog) {
    function filter(input, context) {
        return gettextCatalog.getString(input, null, context);
    }
    filter.$stateful = true;
    return filter;
}]);

// Do not edit this file, it is autogenerated using genplurals.py!
angular.module("gettext").factory("gettextPlurals", function () {
    return function (langCode, n) {
        switch (langCode) {
            case "ay":  // Aymará
            case "bo":  // Tibetan
            case "cgg": // Chiga
            case "dz":  // Dzongkha
            case "fa":  // Persian
            case "id":  // Indonesian
            case "ja":  // Japanese
            case "jbo": // Lojban
            case "ka":  // Georgian
            case "kk":  // Kazakh
            case "km":  // Khmer
            case "ko":  // Korean
            case "ky":  // Kyrgyz
            case "lo":  // Lao
            case "ms":  // Malay
            case "my":  // Burmese
            case "sah": // Yakut
            case "su":  // Sundanese
            case "th":  // Thai
            case "tt":  // Tatar
            case "ug":  // Uyghur
            case "vi":  // Vietnamese
            case "wo":  // Wolof
            case "zh":  // Chinese
                // 1 form
                return 0;
            case "is":  // Icelandic
                // 2 forms
                return (n%10!=1 || n%100==11) ? 1 : 0;
            case "jv":  // Javanese
                // 2 forms
                return n!=0 ? 1 : 0;
            case "mk":  // Macedonian
                // 2 forms
                return n==1 || n%10==1 ? 0 : 1;
            case "ach": // Acholi
            case "ak":  // Akan
            case "am":  // Amharic
            case "arn": // Mapudungun
            case "br":  // Breton
            case "fil": // Filipino
            case "fr":  // French
            case "gun": // Gun
            case "ln":  // Lingala
            case "mfe": // Mauritian Creole
            case "mg":  // Malagasy
            case "mi":  // Maori
            case "oc":  // Occitan
            case "pt_BR":  // Brazilian Portuguese
            case "tg":  // Tajik
            case "ti":  // Tigrinya
            case "tr":  // Turkish
            case "uz":  // Uzbek
            case "wa":  // Walloon
            case "zh":  // Chinese
                // 2 forms
                return n>1 ? 1 : 0;
            case "lv":  // Latvian
                // 3 forms
                return (n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2);
            case "lt":  // Lithuanian
                // 3 forms
                return (n%10==1 && n%100!=11 ? 0 : n%10>=2 && (n%100<10 || n%100>=20) ? 1 : 2);
            case "be":  // Belarusian
            case "bs":  // Bosnian
            case "hr":  // Croatian
            case "ru":  // Russian
            case "sr":  // Serbian
            case "uk":  // Ukrainian
                // 3 forms
                return (n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
            case "mnk": // Mandinka
                // 3 forms
                return (n==0 ? 0 : n==1 ? 1 : 2);
            case "ro":  // Romanian
                // 3 forms
                return (n==1 ? 0 : (n==0 || (n%100 > 0 && n%100 < 20)) ? 1 : 2);
            case "pl":  // Polish
                // 3 forms
                return (n==1 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
            case "cs":  // Czech
            case "sk":  // Slovak
                // 3 forms
                return (n==1) ? 0 : (n>=2 && n<=4) ? 1 : 2;
            case "sl":  // Slovenian
                // 4 forms
                return (n%100==1 ? 1 : n%100==2 ? 2 : n%100==3 || n%100==4 ? 3 : 0);
            case "mt":  // Maltese
                // 4 forms
                return (n==1 ? 0 : n==0 || ( n%100>1 && n%100<11) ? 1 : (n%100>10 && n%100<20 ) ? 2 : 3);
            case "gd":  // Scottish Gaelic
                // 4 forms
                return (n==1 || n==11) ? 0 : (n==2 || n==12) ? 1 : (n > 2 && n < 20) ? 2 : 3;
            case "cy":  // Welsh
                // 4 forms
                return (n==1) ? 0 : (n==2) ? 1 : (n != 8 && n != 11) ? 2 : 3;
            case "kw":  // Cornish
                // 4 forms
                return (n==1) ? 0 : (n==2) ? 1 : (n == 3) ? 2 : 3;
            case "ga":  // Irish
                // 5 forms
                return n==1 ? 0 : n==2 ? 1 : n<7 ? 2 : n<11 ? 3 : 4;
            case "ar":  // Arabic
                // 6 forms
                return (n==0 ? 0 : n==1 ? 1 : n==2 ? 2 : n%100>=3 && n%100<=10 ? 3 : n%100>=11 ? 4 : 5);
            default: // Everything else
                return n != 1 ? 1 : 0;
        }
    }
});

})(window.angular);