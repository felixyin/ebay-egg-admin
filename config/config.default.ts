import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import * as path from 'path';
import * as fs from 'fs';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1597893009804_8539';

  // 配置网站图标 可为网络图标
  config.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(__dirname, '../favicon.ico')),
  };

  // add your egg config in here
  config.middleware = [ 'adminReqLog', 'execption', 'adminAuthority' ];

  config.aesSecret = {
    admin: 'hXuLvp6zmhahtW1kf21DpYxm',
    front: 'eECRYHR5Er93BijVlkMz9CIn',
  };

  config.jwt = {
    secret: 'INnyQ50BEE6AITQraIaDGooJ',
  };

  // Root角色对应ID
  config.rootRoleId = 1;

  /**
   * 框架内置了国际化（I18n）支持，由 egg-i18n 插件提供。
   * 更多配置参考 @{Link:https://github.com/eggjs/egg-i18n}
   */
  config.i18n = {
    defaultLocale: 'zh-CN',
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // https://eggjs.org/zh-cn/core/security.html
  config.security = {
    // 配合egg-cors使用
    // domainWhiteList: [ 'http://localhost:7003' ],
    csrf: {
      // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      enable: false,
      ignoreJSON: true,
    },
  };

  /**
   * egg-global-header
   * https://github.com/eggjs/egg-global-header
   */
  config.globalHeader = {
    'Powered-by': 'sf-admin',
  };

  /**
   * CORS
   * https://github.com/eggjs/egg-cors
   */
  config.cors = {
    // origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // 模板渲染配置
  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  // static config
  config.static = {
    prefix: '/static/',
    dir: path.join(appInfo.baseDir, 'public'),
    dynamic: true,
    preload: false,
    // maxAge: 31536000,
    maxAge: 0,
    buffer: false,
  };

  /**
   * https://eggjs.org/zh-cn/basics/controller.html#获取上传的文件
   */
  config.multipart = {
    mode: 'file',
  };

  // https://eggjs.org/zh-cn/core/error-handling.html
  config.onerror = {
    // all(err: any, ctx: any) {
    //   // 在此处定义针对所有响应类型的错误处理方法
    //   // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    //   ctx.set('Content-Type', 'application/json');
    //   // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
    //   const status = err.status || 500;
    //   const message = status === 500 && ctx.app.config.env === 'prod' ? 'Server internal exception, please try again later' : err.message;
    //   ctx.body = JSON.stringify({
    //     errorCode: err.errorCode || 500,
    //     message,
    //   });
    // },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
