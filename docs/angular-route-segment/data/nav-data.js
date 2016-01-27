angular.module('docApp').constant('DOCS_NAVIGATION', {
  "api": {
    "id": "api",
    "href": "docs/api-index",
    "name": "API",
    "navGroups": [
      {
        "name": "route-segment",
        "type": "groups",
        "href": "api/route-segment",
        "navItems": [
          {
            "name": "filter",
            "type": "section",
            "href": "api/route-segment/filter",
            "navItems": [
              {
                "name": "routeSegmentContains",
                "type": "filter",
                "href": "api/route-segment/filter/routeSegmentContains"
              },
              {
                "name": "routeSegmentEqualsTo",
                "type": "filter",
                "href": "api/route-segment/filter/routeSegmentEqualsTo"
              },
              {
                "name": "routeSegmentParam",
                "type": "filter",
                "href": "api/route-segment/filter/routeSegmentParam"
              },
              {
                "name": "routeSegmentStartsWith",
                "type": "filter",
                "href": "api/route-segment/filter/routeSegmentStartsWith"
              },
              {
                "name": "routeSegmentUrl",
                "type": "filter",
                "href": "api/route-segment/filter/routeSegmentUrl"
              }
            ]
          },
          {
            "name": "provider",
            "type": "section",
            "href": "api/route-segment/provider",
            "navItems": [
              {
                "name": "$routeSegmentProvider",
                "type": "provider",
                "href": "api/route-segment/provider/$routeSegmentProvider"
              }
            ]
          },
          {
            "name": "service",
            "type": "section",
            "href": "api/route-segment/service",
            "navItems": [
              {
                "name": "$routeSegment",
                "type": "service",
                "href": "api/route-segment/service/$routeSegment"
              }
            ]
          },
          {
            "name": "type",
            "type": "section",
            "href": "api/route-segment/type",
            "navItems": [
              {
                "name": "$routeSegment.Segment",
                "type": "type",
                "href": "api/route-segment/type/$routeSegment.Segment"
              },
              {
                "name": "$routeSegmentProvider.Pointer",
                "type": "type",
                "href": "api/route-segment/type/$routeSegmentProvider.Pointer"
              },
              {
                "name": "$routeSegmentProvider.options",
                "type": "type",
                "href": "api/route-segment/type/$routeSegmentProvider.options"
              }
            ]
          }
        ]
      },
      {
        "name": "view-segment",
        "type": "groups",
        "href": "api/view-segment",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/view-segment/directive",
            "navItems": [
              {
                "name": "appViewSegment",
                "type": "directive",
                "href": "api/view-segment/directive/appViewSegment"
              }
            ]
          }
        ]
      }
    ]
  }
});
