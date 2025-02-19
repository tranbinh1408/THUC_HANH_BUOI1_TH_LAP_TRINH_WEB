// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@ant-design/pro-layout/es/PageLoading';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-layout__Layout' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/src/.umi/plugin-layout/Layout.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/~demos/:uuid",
        "layout": false,
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout'), loading: LoadingComponent})],
        "component": ((props) => dynamic({
          loader: async () => {
            const React = await import('react');
            const { default: getDemoRenderArgs } = await import(/* webpackChunkName: 'dumi_demos' */ 'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
            const { default: Previewer } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi-theme-default/es/builtins/Previewer.js');
            const { usePrefersColor, context } = await import(/* webpackChunkName: 'dumi_demos' */ 'dumi/theme');

            return props => {
              
      const { demos } = React.useContext(context);
      const [renderArgs, setRenderArgs] = React.useState([]);

      // update render args when props changed
      React.useLayoutEffect(() => {
        setRenderArgs(getDemoRenderArgs(props, demos));
      }, [props.match.params.uuid, props.location.query.wrapper, props.location.query.capture]);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
            }
          },
          loading: () => null,
        }))()
      },
      {
        "path": "/_demos/:uuid",
        "redirect": "/~demos/:uuid"
      },
      {
        "__dumiRoot": true,
        "layout": false,
        "path": "/~docs",
        "wrappers": [dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'../dumi/layout'), loading: LoadingComponent}), dynamic({ loader: () => import(/* webpackChunkName: 'wrappers' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/node_modules/dumi-theme-default/es/layout.js'), loading: LoadingComponent})],
        "routes": [
          {
            "path": "/~docs",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'README.md' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/README.md'), loading: LoadingComponent}),
            "exact": true,
            "meta": {
              "locale": "en-US",
              "order": null,
              "filePath": "README.md",
              "updatedTime": 1739929801482,
              "slugs": [
                {
                  "depth": 1,
                  "value": "WEB BASE V3",
                  "heading": "web-base-v3"
                },
                {
                  "depth": 2,
                  "value": "Web base v3 based on:",
                  "heading": "web-base-v3-based-on"
                },
                {
                  "depth": 2,
                  "value": "Environment Prepare",
                  "heading": "environment-prepare"
                },
                {
                  "depth": 2,
                  "value": "Provided Scripts",
                  "heading": "provided-scripts"
                },
                {
                  "depth": 3,
                  "value": "Start project",
                  "heading": "start-project"
                },
                {
                  "depth": 3,
                  "value": "Build project",
                  "heading": "build-project"
                }
              ],
              "title": "WEB BASE V3"
            },
            "title": "WEB BASE V3"
          }
        ],
        "title": "ant-design-pro",
        "component": (props) => props.children
      },
      {
        "path": "/user",
        "layout": false,
        "routes": [
          {
            "path": "/user/login",
            "layout": false,
            "name": "login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__Login' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/src/pages/user/Login'), loading: LoadingComponent}),
            "exact": true
          },
          {
            "path": "/user",
            "redirect": "/user/login",
            "exact": true
          }
        ]
      },
      {
        "path": "/dashboard",
        "name": "Dashboard",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TrangChu' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/src/pages/TrangChu'), loading: LoadingComponent}),
        "icon": "HomeOutlined",
        "exact": true
      },
      {
        "path": "/gioi-thieu",
        "name": "About",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TienIch__GioiThieu' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/src/pages/TienIch/GioiThieu'), loading: LoadingComponent}),
        "hideInMenu": true,
        "exact": true
      },
      {
        "path": "/random-user",
        "name": "RandomUser",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__RandomUser' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/src/pages/RandomUser'), loading: LoadingComponent}),
        "icon": "ArrowsAltOutlined",
        "exact": true
      },
      {
        "path": "/game",
        "name": "Game",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Game__GuessNumber' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/src/pages/Game/GuessNumber'), loading: LoadingComponent}),
        "icon": "PlayCircleOutlined",
        "exact": true
      },
      {
        "path": "/subject-management",
        "name": "SubjectManagement",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__SubjectManagement' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/src/pages/SubjectManagement'), loading: LoadingComponent}),
        "icon": "BookOutlined",
        "exact": true
      },
      {
        "path": "/notification",
        "routes": [
          {
            "path": "/notification/subscribe",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ThongBao__Subscribe' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/src/pages/ThongBao/Subscribe'), loading: LoadingComponent})
          },
          {
            "path": "/notification/check",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ThongBao__Check' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/src/pages/ThongBao/Check'), loading: LoadingComponent})
          },
          {
            "path": "/notification/",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ThongBao__NotifOneSignal' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/src/pages/ThongBao/NotifOneSignal'), loading: LoadingComponent})
          }
        ],
        "layout": false,
        "hideInMenu": true
      },
      {
        "path": "/index.html",
        "exact": true
      },
      {
        "path": "/",
        "exact": true
      },
      {
        "path": "/403",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__403__403Page' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/src/pages/exception/403/403Page'), loading: LoadingComponent}),
        "layout": false,
        "exact": true
      },
      {
        "path": "/hold-on",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__DangCapNhat' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/src/pages/exception/DangCapNhat'), loading: LoadingComponent}),
        "layout": false,
        "exact": true
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__404' */'C:/Users/ASUS/Documents/Gitlab/Nhom19.2/src/pages/exception/404'), loading: LoadingComponent}),
        "exact": true
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
