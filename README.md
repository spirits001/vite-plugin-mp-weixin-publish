# 用于自动上传到微信小程序的vite插件

## 安装

通过npm安装

```bash
npm install vite-plugin-mp-weixin-publish -D
```

## 配置

设置options

```javascript
const options = {
  appid: '', // 小程序的appid
  privateKeyPath: '', // 小程序代码上传密钥路径
  version: '', //版本号
  type: '', // 非必填，项目的类型，有效值 miniProgram/miniProgramPlugin/miniGame/miniGamePlugin
  ignores: [], // 非必填，指定需要排除的规则，默认值：['node_modules/**/*']
  desc: '', // 非必填，版本说明
  setting: {}, // 非必填，项目配置，会覆盖project.config.json中的配置,具体内容：https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html#%E7%BC%96%E8%AF%91%E8%AE%BE%E7%BD%AE
};
```

## 用法

在 vite.config.ts 中注册本插件

```javascript
import { defineConfig } from 'vite'
import vitePluginMpWeixinPublish from 'vite-plugin-mp-weixin-publish'
import { Options } from "vite-plugin-mp-weixin-publish";

const options: Options = {
    appid: '<Your Appid>',
    privateKeyPath: '<Your PrivateKey Path>',
    version: '<Your Version>',
    setting: {
      minifyJS: true,
      minifyWXML: true,
      minifyWXSS: true,
      minify: true,
    },
}

export default defineConfig({
    plugins: [vitePluginMpWeixinPublish(options)]
})
```

最后build的时候，将自动上传代码到微信小程序
