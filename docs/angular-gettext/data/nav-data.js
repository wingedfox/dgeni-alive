angular.module('docApp').constant('DOCS_NAVIGATION', {
  "api": {
    "id": "api",
    "href": "index",
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
      },
      {
        "name": "src",
        "type": "groups",
        "href": "api/src",
        "navItems": []
      }
    ]
  }
});
