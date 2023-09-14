import fs from "fs";
import Fontmin from "fontmin";
import rename from "gulp-rename";
import path from "path";
function generateChineseString() {
  const chineseCharacters = [];

  // 生成中文字符的 Unicode 范围是 0x4e00 到 0x9fff
  for (let i = 0x4e00; i <= 0x9fff; i++) {
    chineseCharacters.push(String.fromCodePoint(i));
  }

  // 使用数组的 join 方法将字符连接成一个字符串
  return chineseCharacters.join("");
}
// 定义一个函数，生成包含所有英文字符的字符串
function generateEnglishString() {
  const englishCharacters = [];
  // 生成小写英文字母
  for (let i = 97; i <= 122; i++) {
    englishCharacters.push(String.fromCharCode(i));
  }
  // 生成大写英文字母
  for (let i = 65; i <= 90; i++) {
    englishCharacters.push(String.fromCharCode(i));
  }
  // 使用数组的 join 方法将字符连接成一个字符串
  return englishCharacters.join("");
}

export function FontcutHandler(TargetFilePath, options) {
  if (!options.include && !options.config) {
    console.log("缺少--include <中文|英文|中文英文>或--config");
    process.exit(1);
  }
  if (options.config) {
    // 读取配置
    const isFileExist = fs.existsSync(path.join(TargetFilePath));
    const isConfigExist = fs.existsSync(path.join("fontcut.txt"));
    if (!isFileExist) {
      console.log("字体文件" + TargetFilePath + "不存在");
      process.exit(1);
    }
    if (!isConfigExist) {
      console.log("配置文件fontcut.txt不存在");
      process.exit(1);
    }
    const keepWords = fs.readFileSync(path.join("fontcut.txt"), "utf-8");
    const fontmin = new Fontmin()
      .src(path.join(TargetFilePath))
      .dest(path.dirname(TargetFilePath))
      .use(rename(`subset-${path.basename(TargetFilePath)}`))
      .use(
        Fontmin.glyph({
          text: keepWords,
        })
      );
    fontmin.run(function (err, files) {
      if (err) {
        throw err;
      }
      console.log("文件生成成功！", `subset-${path.basename(TargetFilePath)}`);
    });
  } else {
    //
    let keepWords = "";
    switch (options.include) {
      case "中文":
        keepWords = generateChineseString();
        break;
      case "英文":
        keepWords = generateChineseString();
        break;
      case "中文英文":
        keepWords = generateChineseString() + generateChineseString();
        break;
      default:
        console.log("子集类型待补充...,目前仅支持中文|英文|中文英文");
        process.exit(1);
    }
    const fontmin = new Fontmin()
      .src(path.join(TargetFilePath))
      .dest(path.dirname(TargetFilePath))
      .use(rename(`subset-${path.basename(TargetFilePath)}`))
      .use(
        Fontmin.glyph({
          text: keepWords,
        })
      );
    fontmin.run(function (err, files) {
      if (err) {
        throw err;
      }
      console.log("文件生成成功！", `subset-${path.basename(TargetFilePath)}`);
    });
  }
}
