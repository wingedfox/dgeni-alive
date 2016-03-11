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
            "name": "object",
            "type": "section",
            "href": "api/gettext/object",
            "navItems": [
              {
                "name": "gettext",
                "type": "object",
                "href": "api/gettext/object/gettext"
              }
            ]
          },
          {
            "name": "service",
            "type": "section",
            "href": "api/gettext/service",
            "navItems": [
              {
                "name": "gettextCatalog",
                "type": "service",
                "href": "api/gettext/service/gettextCatalog"
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
          }
        ]
      }
    ]
  },
  "docs": {
    "id": "docs",
    "href": "docs",
    "name": "Docs",
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
            "name": "custom-annotations",
            "type": "",
            "href": "docs/custom-annotations",
            "title": "Custom Annotations"
          },
          {
            "name": "manual-setstrings",
            "type": "",
            "href": "docs/manual-setstrings",
            "title": "Manual Set Strings"
          },
          {
            "name": "translate",
            "type": "",
            "href": "docs/translate",
            "title": "Translating"
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
  }
});
