// @ts-nocheck
import React from 'react';
import { ApplyPluginsType, dynamic } from 'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';
import LoadingComponent from '@ant-design/pro-layout/es/PageLoading';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": dynamic({ loader: () => import(/* webpackChunkName: '.umi__plugin-layout__Layout' */'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/src/.umi/plugin-layout/Layout.tsx'), loading: LoadingComponent}),
    "routes": [
      {
        "path": "/user",
        "layout": false,
        "routes": [
          {
            "path": "/user/login",
            "layout": false,
            "name": "login",
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__user__Login' */'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/src/pages/user/Login'), loading: LoadingComponent}),
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
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TrangChu' */'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/src/pages/TrangChu'), loading: LoadingComponent}),
        "icon": "HomeOutlined",
        "exact": true
      },
      {
        "path": "/gioi-thieu",
        "name": "About",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__TienIch__GioiThieu' */'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/src/pages/TienIch/GioiThieu'), loading: LoadingComponent}),
        "hideInMenu": true,
        "exact": true
      },
      {
        "path": "/random-user",
        "name": "RandomUser",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__RandomUser' */'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/src/pages/RandomUser'), loading: LoadingComponent}),
        "icon": "ArrowsAltOutlined",
        "exact": true
      },
      {
        "path": "/notification",
        "routes": [
          {
            "path": "/notification/subscribe",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ThongBao__Subscribe' */'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/src/pages/ThongBao/Subscribe'), loading: LoadingComponent})
          },
          {
            "path": "/notification/check",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ThongBao__Check' */'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/src/pages/ThongBao/Check'), loading: LoadingComponent})
          },
          {
            "path": "/notification/",
            "exact": true,
            "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__ThongBao__NotifOneSignal' */'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/src/pages/ThongBao/NotifOneSignal'), loading: LoadingComponent})
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
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__403__403Page' */'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/src/pages/exception/403/403Page'), loading: LoadingComponent}),
        "layout": false,
        "exact": true
      },
      {
        "path": "/hold-on",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__DangCapNhat' */'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/src/pages/exception/DangCapNhat'), loading: LoadingComponent}),
        "layout": false,
        "exact": true
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__exception__404' */'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/src/pages/exception/404'), loading: LoadingComponent}),
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
