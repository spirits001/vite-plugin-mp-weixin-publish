import path from "path";
import { normalizePath } from "vite";

export interface Setting {
  es6?: boolean;
  es7?: boolean;
  minifyJS?: boolean;
  minifyWXML?: boolean;
  minifyWXSS?: boolean;
  minify?: boolean;
  codeProtect?: boolean;
  autoPrefixWXSS?: boolean;
}
export interface Options {
  appid: string;
  privateKeyPath: string;
  version: string;
  type?: "miniProgram" | "miniProgramPlugin" | "miniGame" | "miniGamePlugin";
  ignores?: string[];
  desc?: string;
  setting?: Setting;
  robot?: number;
}

interface PluginRes {
  name: string;
  enforce: "pre" | "post" | undefined;
  apply: "build" | "serve";
  configResolved(config: any): void;
  closeBundle(): Promise<void>;
}

export default function vitePluginMpWeixinPublish(options: Options): PluginRes | undefined {
  let basePath = "/";
  let buildConfig: any = {};

  return {
    name: "vite-plugin-mp-weixin-publish",
    enforce: "post",
    apply: "build",
    configResolved(config: any) {
      basePath = config.base;
      buildConfig = config.build;
    },
    async closeBundle() {
      const ci = require("miniprogram-ci");
      const createData: any = {
        appid: options.appid,
        projectPath: normalizePath(path.resolve(normalizePath(buildConfig.outDir))),
        privateKeyPath: path.resolve(options.privateKeyPath),
        ignores: ["node_modules/**/*"],
      };
      if (options.type) createData.type = options.type;
      if (options.ignores) createData.ignores = options.ignores;

      (async () => {
        const project = new ci.Project(createData);
        const uploadData: any = {
          project,
          version: options.version,
          onProgressUpdate: console.log,
          robot: options.robot||15,
        };
        if (options.desc) uploadData.desc = options.desc;
        if (options.setting) uploadData.setting = options.setting;
        const uploadResult = await ci.upload(uploadData);
        console.log(uploadResult);
      })();
    },
  };
}
