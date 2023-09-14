#!/usr/bin/env node
import { program } from "commander";
import { generatePageHandler } from "./src/GeneratePage.js";
import { FontcutHandler } from "./src/Fontcut.js";
const getDefaultSrc = (type) => {
  console.log("--->", type);
  switch (type) {
    case "page":
      return "src/pages";
    case "project":
      return "";
    default:
      return "";
  }
};
program.version("1.0.0", "-v,--version", "工具包版本号");
program
  .command("g <type> <sourceName> <targetName> [options...]")
  .option("-s|--src <src>", "生成的位置,默认src/pages")
  .option("--default", "是否使用默认模板")
  .allowUnknownOption()
  .action(
    (type, sourceName, targetName, UnexpectedOptions, ExpectedOptions) => {
      // UnexpectedOptions ---->[options...]
      // ExpectedOptions -----> .option()
      // console.log("type:", type);
      // console.log("sourceName:", sourceName);
      // console.log("targetName:", targetName);
      // console.log("UnexpectedOptions:", UnexpectedOptions);
      // console.log("ExpectedOptions:", ExpectedOptions);
      // console.log("parseUnexpectedOptions:", parseOption(UnexpectedOptions));
      // 不指定src是根据type判断src默认值
      if (!ExpectedOptions.src) {
        ExpectedOptions.src = getDefaultSrc(type);
      }
      switch (type) {
        case "page":
          generatePageHandler(
            sourceName,
            targetName,
            UnexpectedOptions,
            ExpectedOptions
          );
          break;
        case "project":
          // generateProjectHandler(
          //   sourceName,
          //   targetName,
          //   UnexpectedOptions,
          //   ExpectedOptions
          // );
          // TODO:待完成 项目生成
          break;
        default:
          break;
      }
    }
  );
program
  .command("fontcut <TargetFilePath>")
  .description("根据指定文字裁剪字体库")
  .option(
    "-i|--include <char>",
    "指定需要裁剪的类型：中文|英文|中文英文,当使用--config时失效"
  )
  .option("-c|--config", "使用该option时，会读取根目录下的fontcut.txt文件")
  .action(FontcutHandler);
program.parse();
