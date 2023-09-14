import fs from "fs";
// 将['-p',--q','--age','sdk','--count', '-x1','-y','1']转换成对象
// 场景，非预期options解析
export function parseOption(options) {
  const result = {};
  let currentKey = null;
  for (const item of options) {
    if (item.startsWith("--")) {
      currentKey = item.slice(2); // 移除 '--' 前缀
      if (item.indexOf("=")) {
        const splitArr = currentKey.split("=");
        result[splitArr[0]] = splitArr[1];
      } else if (!result[currentKey]) {
        result[currentKey] = undefined;
      }
    } else if (item.startsWith("-")) {
      currentKey = item.slice(1); // 移除 '-' 前缀
      const match = currentKey.match(/^(.*?)(\d+)$/);
      if (match) {
        // 第一个捕获组（match[1]）包含字符串部分，第二个捕获组（match[2]）包含数字部分
        const stringPart = match[1];
        const numberPart = parseInt(match[2], 10); // 将捕获的数字部分转换为整数
        result[stringPart] = numberPart;
      } else {
        // 如果没有匹配到以数字结尾的部分
        if (!result[currentKey]) {
          result[currentKey] = undefined;
        }
      }
    } else if (currentKey !== null) {
      if (item.startsWith("=")) {
        result[currentKey] = item.slice(1); // 去除等号
      } else {
        result[currentKey] = isNaN(item) ? item : Number(item);
      }
      currentKey = null;
    }
  }
  return result;
}
// 获取指定文件夹下所有的文件夹名称或文件名称
export function GetAllFolderAndFileNameFromTargetFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    console.log(folderPath + "不存在");
    process.exit(1);
  }
  if (!fs.statSync(folderPath).isDirectory()) {
    console.log(folderPath + "不是文件夹");
    process.exit(1);
  }
  const files = fs.readdirSync(folderPath);
  return files;
}
