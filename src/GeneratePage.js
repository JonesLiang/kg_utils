import fs from "fs";
import path from "path";
import {
  GetAllFolderAndFileNameFromTargetFolder,
  parseOption,
} from "../utils/index.js";
import { fileURLToPath } from "url";

/**
 * type options = {
 *   source:string,
 *   target:string,
 *   [user custom define]:string
 *
 * 实现步骤：
 *     1. 从.templates文件夹中找子文件夹，是否存在文件夹名为source，如果存在则可以生成改模板文件
 *     2. 遍历改文件夹下所有文件，并进行替换操作
 * }
 * */
// 遍历文件夹下所有子文件 并读取文件内容
export function TraverseFolderAndReadContent({
  folderPath,
  directoryReadHandler,
  fileReadHandler,
  parentPath,
}) {
  if (parentPath === "") {
    if (!fs.existsSync(folderPath)) {
      console.log(folderPath + "不存在");
      process.exit(1);
    }
    if (!fs.statSync(folderPath).isDirectory()) {
      console.log(folderPath + "不是文件夹");
      process.exit(1);
    }
  }
  const files = fs.readdirSync(folderPath);
  for (let i = 0; i < files.length; i++) {
    const filePath = path.join(folderPath, files[i]);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      directoryReadHandler?.({
        folderName: path.basename(filePath),
        parentPath,
      });
      TraverseFolderAndReadContent({
        folderPath: filePath,
        directoryReadHandler,
        fileReadHandler,
        parentPath: `${parentPath}/${path.basename(filePath)}`,
      });
    } else if (stats.isFile()) {
      const fileName = path.basename(filePath);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      fileReadHandler?.({ fileName, content: fileContent, parentPath });
    }
  }
}
export function generatePageHandler(
  sourceName,
  targetName,
  UnexpectedOptions,
  ExpectedOptions
) {
  // 获取当前模块的文件路径
  const __filename = fileURLToPath(import.meta.url);
  // 获取当前模块所在的目录路径
  const __dirname = path.dirname(path.dirname(__filename));
  // 解析未预期的optionsd
  const parsedUnexpectedOptions = Object.assign(
    parseOption(UnexpectedOptions) || {},
    { name: targetName.split(".")[0] }
  );
  // 模板地址，--default===>./.templates ，否则：用户本地.templates
  const templatesPath = ExpectedOptions.default
    ? path.join(__dirname, ".templates")
    : path.join(".templates");
  // 获取模板page文件夹下所有的指令
  const pageTempNames = GetAllFolderAndFileNameFromTargetFolder(templatesPath);
  // 判断指令是否存在
  if (!pageTempNames.includes(sourceName)) {
    console.log(
      ".templates文件夹下不存在模板文件：",
      sourceName,
      pageTempNames
    );
    process.exit(1);
  }
  // 模板文件路径
  const folderPath = templatesPath + "/" + sourceName;
  // 生成文件位置
  const parentPath = ExpectedOptions.src + "/" + targetName;
  // 判断模板是文件夹还是文件
  const folderStat = fs.statSync(folderPath);
  if (folderStat.isDirectory()) {
    //   创建文件夹
    fs.mkdir(parentPath, (err, data) => {
      if (err) {
        console.log("创建文件夹失败！", parentPath);
        throw Error("创建文件夹失败！" + parentPath);
      }
      console.log("创建文件夹成功：", targetName);
      // 遍历模板文件夹，并生成文件
      TraverseFolderAndReadContent({
        folderPath,
        parentPath,
        directoryReadHandler: ({ folderName, parentPath }) => {
          fs.mkdir(parentPath + "/" + folderName, (err, data) => {
            if (err) {
              throw Error("创建文件夹失败！", err);
            }
            console.log("创建文件夹成功：", folderName);
          });
        },
        fileReadHandler: ({ fileName, content, parentPath }) => {
          // 根据输入的option，替换文件中的内容
          const replacedContent = content.replace(
            /\{\{\{\s*(\w+)\s*\}\}\}/g,
            (match, key) => {
              // 如果对象中存在对应的属性，则替换为属性值，否则保留原始占位符
              return parsedUnexpectedOptions.hasOwnProperty(key)
                ? parsedUnexpectedOptions[key]
                : match;
            }
          );
          fs.writeFile(
            parentPath + "/" + fileName,
            replacedContent,
            (err, data) => {
              if (err) {
                throw Error("创建文件失败！", err);
              }
              console.log("创建文件成功：", fileName);
            }
          );
        },
      });
    });
  } else {
    // 模板是文件
    const fileContent = fs.readFileSync(folderPath, "utf-8");
    const replacedContent = fileContent.replace(
      /\{\{\{(\w+)\}\}\}/g,
      (match, key) => {
        // 如果对象中存在对应的属性，则替换为属性值，否则保留原始占位符
        return parsedUnexpectedOptions.hasOwnProperty(key)
          ? parsedUnexpectedOptions[key]
          : match;
      }
    );
    fs.writeFile(parentPath, replacedContent, (err, data) => {
      if (err) {
        console.log("创建文件失败！");
        throw Error(err);
      }
      console.log("创建文件成功！", targetName);
    });
  }
}
