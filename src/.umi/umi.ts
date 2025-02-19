// @ts-nocheck
import './core/polyfill';
import '../global.tsx';
import { plugin } from './core/plugin';
import './core/pluginRegister';
import { createHistory } from './core/history';
import { ApplyPluginsType } from 'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/node_modules/@umijs/runtime';
import { renderClient } from 'C:/Users/ADMIN/Documents/GitHub/THUC_HANH_BUOI1_TH_LAP_TRINH_WEB/baseltw/node_modules/@umijs/renderer-react/dist/index.js';
import { getRoutes } from './core/routes';



import { _onCreate } from './plugin-locale/locale';
_onCreate();

const getClientRender = (args: { hot?: boolean; routes?: any[] } = {}) => plugin.applyPlugins({
  key: 'render',
  type: ApplyPluginsType.compose,
  initialValue: () => {
    const opts = plugin.applyPlugins({
      key: 'modifyClientRenderOpts',
      type: ApplyPluginsType.modify,
      initialValue: {
        routes: args.routes || getRoutes(),
        plugin,
        history: createHistory(args.hot),
        isServer: process.env.__IS_SERVER,
        dynamicImport: true,
        rootElement: 'root',
      },
    });
    return renderClient(opts);
  },
  args,
});

const clientRender = getClientRender();
export default clientRender();


    window.g_umi = {
      version: '3.5.43',
    };
  

// hot module replacement
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./core/routes', () => {
    const ret = require('./core/routes');
    if (ret.then) {
      ret.then(({ getRoutes }) => {
        getClientRender({ hot: true, routes: getRoutes() })();
      });
    } else {
      getClientRender({ hot: true, routes: ret.getRoutes() })();
    }
  });
}
