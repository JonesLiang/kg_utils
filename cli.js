#!/usr/bin/env node
import { program } from "commander";
import { generatePageHandler } from "./src/GeneratePage.js";
import { FontcutHandler } from "./src/Fontcut.js";
import { swaggerTsApi, getSwaggerTemplate } from "./src/SwaggerToTypescript.js";
program.version("1.0.0", "-v,--version", "工具包版本号");
program
  .command("g <sourceName> <targetName> [options...]")
  .option("-s|--src <src>", "生成的位置,默认src/pages", "src/pages")
  .option("--default", "是否使用默认模板")
  .allowUnknownOption()
  .action((sourceName, targetName, UnexpectedOptions, ExpectedOptions) => {
    // UnexpectedOptions ---->[options...]
    // ExpectedOptions -----> .option()
    // console.log("type:", type);
    // console.log("sourceName:", sourceName);
    // console.log("targetName:", targetName);
    // console.log("UnexpectedOptions:", UnexpectedOptions);
    // console.log("ExpectedOptions:", ExpectedOptions);
    // console.log("parseUnexpectedOptions:", parseOption(UnexpectedOptions));
    // 不指定src是根据type判断src默认值
    generatePageHandler(
      sourceName,
      targetName,
      UnexpectedOptions,
      ExpectedOptions
    );
  });
program
  .command("fontcut <TargetFilePath>")
  .description("根据指定文字裁剪字体库")
  .option(
    "-i|--include <char>",
    "指定需要裁剪的类型：中文|英文|中文英文,当使用--config时失效"
  )
  .option("-c|--config", "使用该option时，会读取根目录下的fontcut.txt文件")
  .action(FontcutHandler);

program
  .description("通过 swagger-typescript-api 生成 api")
  .command("swagger")
  .requiredOption("-u, --url <http>", "获取 swagger.json 的 url")
  .option("-p, --proxy <string>", "proxy 前缀", "/api")
  .option("-o, --output <string>", "api 生成路径", "./src/services")
  .option("-r, --reserve <boolean>", "swagger 自动生成的模板是否保留", false)
  .option("-t, --templatePath  <string>", "使用指定的 swagger 模板路径")
  .action(({ url, proxy, output, reserve, templatePath }) => {
    swaggerTsApi({ url, proxy, output, reserve, templatePath });
  });
program
  .description("获取当前swagger template")
  .command("swagger-template")
  .action(() => {
    getSwaggerTemplate();
  });
program.parse();
