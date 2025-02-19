// @ts-nocheck
import React, { useState, useEffect } from "react";
import { ApplyPluginsType, useModel , useIntl, traverseModifyRoutes, useAccess } from "umi";
import { plugin } from "../core/umiExports";
import LayoutComponent from './layout/layout/index.tsx';

export default props => {
  const [runtimeConfig, setRuntimeConfig] = useState(null);

  const initialInfo = (useModel && useModel("@@initialState")) || {
    initialState: undefined,
    loading: false,
    setInitialState: null
  }; // plugin-initial-state 未开启

  const access = useAccess?.();

  useEffect(() => {
    const useRuntimeConfig =
      plugin.applyPlugins({
        key: "layout",
        type: ApplyPluginsType.modify,
        initialValue: {
          ...initialInfo,
          traverseModifyRoutes: (menuData) => {return traverseModifyRoutes?.(menuData, access);},
        },
      }) || {};
    if (useRuntimeConfig instanceof Promise) {
      useRuntimeConfig.then((config) => {
        setRuntimeConfig(config);
      });
      return;
    }
    setRuntimeConfig(useRuntimeConfig);
  }, [initialInfo?.initialState, access]);

  const userConfig = {
    ...{'name':'ant-design-pro','theme':'PRO','locale':true,'showBreadcrumb':true,'navTheme':'light','primaryColor':'#CC0D00','borderRadiusBase':'2px','layout':'mix','contentWidth':'Fluid','fixedHeader':false,'fixSiderbar':true,'colorWeak':false,'title':'LẬP TRÌNH WEB - RIPT','pwa':false,'logo':'/logo.png','iconfontUrl':'','headerTheme':'light','headerHeight':60,'siderWidth':220},
    ...runtimeConfig || {}
  };

  const { formatMessage } = useIntl();

  if(!runtimeConfig){
    return null
  }

  return React.createElement(LayoutComponent, {
    userConfig,
    formatMessage,
    ...props
  });
};
