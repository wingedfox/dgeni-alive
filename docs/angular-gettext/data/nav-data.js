angular.module('docApp').constant('DOCS_NAVIGATION', {
  "api": {
    "id": "api",
    "href": "api/index",
    "name": "API",
    "navGroups": [
      {
        "name": "gettext",
        "type": "groups",
        "href": "api/gettext",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/gettext/directive",
            "navItems": [
              {
                "name": "translate",
                "type": "directive",
                "href": "api/gettext/directive/translate"
              }
            ]
          },
          {
            "name": "factory",
            "type": "section",
            "href": "api/gettext/factory",
            "navItems": [
              {
                "name": "gettextCatalog",
                "type": "factory",
                "href": "api/gettext/factory/gettextCatalog"
              },
              {
                "name": "gettextFallbackLanguage",
                "type": "factory",
                "href": "api/gettext/factory/gettextFallbackLanguage"
              },
              {
                "name": "gettextPlurals",
                "type": "factory",
                "href": "api/gettext/factory/gettextPlurals"
              }
            ]
          },
          {
            "name": "filter",
            "type": "section",
            "href": "api/gettext/filter",
            "navItems": [
              {
                "name": "translate",
                "type": "filter",
                "href": "api/gettext/filter/translate"
              }
            ]
          },
          {
            "name": "function",
            "type": "section",
            "href": "api/gettext/function",
            "navItems": [
              {
                "name": "gettext",
                "type": "function",
                "href": "api/gettext/function/gettext"
              }
            ]
          }
        ]
      }
    ]
  },
  "docs": {
    "id": "docs",
    "href": "docs/index",
    "name": "Docs",
    "fullscreen": true,
    "navGroups": [
      {
        "name": "Docs",
        "type": "groups",
        "href": "docs",
        "navItems": [
          {
            "name": "context",
            "type": "",
            "href": "docs/context",
            "title": "Translation Contexts"
          },
          {
            "name": "grunt-angular-gettext",
            "type": "",
            "href": "docs/grunt-angular-gettext",
            "title": "grunt-angular-gettext API"
          },
          {
            "name": "index",
            "type": "",
            "href": "docs/index",
            "title": "Getting started"
          }
        ]
      }
    ]
  },
  "error": {
    "id": "error",
    "href": "error/index",
    "name": "Errors",
    "navGroups": [
      {
        "name": "Errors",
        "title": "Error Reference",
        "type": "groups",
        "href": "error",
        "navItems": [
          {
            "name": "gettext",
            "type": "section",
            "href": "error/gettext",
            "navItems": [
              {
                "name": "MissingPlural",
                "type": "error",
                "href": "error/gettext/MissingPlural"
              }
            ]
          }
        ]
      }
    ]
  },
  "guide": {
    "id": "guide",
    "href": "guide/index",
    "name": "Guide",
    "fullscreen": true,
    "navGroups": [
      {
        "name": "Guide",
        "type": "groups",
        "href": "guide",
        "navItems": [
          {
            "name": "annotate-js",
            "type": "",
            "href": "guide/annotate-js",
            "title": "Annotating JavaScript source"
          },
          {
            "name": "annotate",
            "type": "",
            "href": "guide/annotate",
            "title": "Annotating markup"
          },
          {
            "name": "compile",
            "type": "",
            "href": "guide/compile",
            "title": "Compiling translations"
          },
          {
            "name": "configure",
            "type": "",
            "href": "guide/configure",
            "title": "Configuring angular-gettext"
          },
          {
            "name": "custom-annotations",
            "type": "",
            "href": "guide/custom-annotations",
            "title": "Custom Annotations"
          },
          {
            "name": "extract",
            "type": "",
            "href": "guide/extract",
            "title": "Extracting strings"
          },
          {
            "name": "index",
            "type": "",
            "href": "guide/index",
            "title": "Developer guide"
          },
          {
            "name": "install",
            "type": "",
            "href": "guide/install",
            "title": "Adding angular-gettext to your project"
          },
          {
            "name": "lazy-loading",
            "type": "",
            "href": "guide/lazy-loading",
            "title": "Lazy-loading languages"
          },
          {
            "name": "manual-setstrings",
            "type": "",
            "href": "guide/manual-setstrings",
            "title": "Manual Set Strings"
          },
          {
            "name": "translate",
            "type": "",
            "href": "guide/translate",
            "title": "Translating"
          }
        ]
      }
    ]
  }
});
