### 1. 生成模板文件
- [ ] 项目生成功能
- [ ] page、project公共模板
- [ ] 删除参数type，考虑项目模板直接从gitlab上拉取（待定）
  
`kg g <type> <TemplateName> <TargetName> [options...] -s src/pages --default`
| 参数 |  | 描述 |
| ---- | ---- | ----|
| type | 必填 |  page/project |
TemplateName | 必填 | 模板文件/文件夹名称，.templates/pages的子文件全称或子文件夹名称 |
| TargetName | 必填 | 需要生成的文件/文件夹名称 |
| -s |  可选 | 生成文件位置，当type为page时，src默认为src/pages, 当type为project时，默认为'' |
| --default | 可选 | 不写的话默认使用用户本地的.templates文件夹下的配置，加上--default，会从包里面找。 |
| [options...] | 可选 | 用户自定义变量，同umi生成器，模板文件中使用{{{customVariable}}}字符串时，命令行中使用--customVariable test，就会将文件中所有{{{customVariable}}}替换为test，并且文件中的{{{name}}}会自动替换为TargetName |

例如：`kg g page AntdTableCURD UserManage -s src/pages/System -count1`

实现思路：TemplateName完全依赖于.templates文件夹下的pages或projects。
当type===’page‘,会从.templates/pages文件夹下查找所有子文件名称，如果存在就生成，否则报错。
type===project时，同上。

### 2. 根据指定文字裁剪字体库文件
- [ ] 转换格式ttf，woff等格式转换
  
`kg fontcut <TargetFilePath> --config --include 中文|英文|中文英文`
| 参数 |  | 描述 |
| ---- | ---- | ----|
| TargetFilePath | 必填 |  字体库路径，例如public/fonts/xxx.ttf |
| --config | 可选 | 使用--config，默认从项目根目录下读取fontcut.txt中的内容，且--include会失效 |
| --include | 可选 | 预设中文|英文|中文英文 |

生成在TargetFilePath同级目录下，新文件前缀为subset-xxx.ttf

实现思路：基于fontmin库

### 3. 压缩图片文件夹
- [ ] 待实现
`kg imagemin <TargetFilePath>`
实现思路：基于imagemin库