### 1. 生成模板文件
  
`kg g <TemplateName> <TargetName> [options...] -s src/pages --default`
| 参数 |  | 描述 |
| ---- | ---- | ----|
|TemplateName | 必填 | 模板文件/文件夹名称，.templates的子文件全称或子文件夹名称 |
| TargetName | 必填 | 需要生成的文件/文件夹名称 |
| -s |  可选 | 生成文件位置，src默认为src/pages|
| --default | 可选 | 不写的话默认使用用户本地的.templates文件夹下的配置，加上--default，会从包里面找。 |
| [options...] | 可选 | 用户自定义变量，同umi生成器，模板文件中使用{{{customVariable}}}字符串时，命令行中使用--customVariable test，就会将文件中所有{{{customVariable}}}替换为test，并且文件中的{{{name}}}会自动替换为TargetName |

例如：`kg g AntdTableCURD UserManage -s src/pages/System -count1`


### 2. 根据指定文字裁剪字体库文件
- [ ] 转换格式ttf，woff等格式转换
  
`kg fontcut <TargetFilePath> --config --include 中文|英文|中文英文`
| 参数 |  | 描述 |
| ---- | ---- | ----|
| TargetFilePath | 必填 |  字体库路径，例如public/fonts/xxx.ttf |
| --config | 可选 | 使用--config，默认从项目根目录下读取fontcut.txt中的内容，且--include会失效 |
| --include | 可选 | 预设中文/英文/中文英文 |

生成在TargetFilePath同级目录下，新文件前缀为subset-xxx.ttf


### 3. 压缩图片文件夹
- [ ] 待实现
`kg imagemin <TargetFilePath>`


### 4. swagger接口文档生成typescript service
- [ ] 待优化
  `kg swagger -u http://192.168.3.129:10111/auth-server/v2/api-docs --proxy /api --output ./src/services --reserve false --templatePath .swaggerTemplate`
  | 参数 |  | 描述 |
| ---- | ---- | ----|
| -u/--url | 必填 |  swagger地址 |
| -p/--proxy | 可选 | proxy前缀,默认/api |
| -o/--output | 可选 | 输出文件地址，默认.src/services |
| -r/--reserve | 可选 | 当使用默认模板时，会在包的根目录下自动生成一个模板，该选项表示是否移除自动生成的模板，默认值为false |
| -t/--template | 可选 | 用户本地模板文件地址，可通过kg swagger-template指令来生成模板文件，默认放在.swaggerTemplate文件夹中 |
swagger template 使用eta语法：https://eta.js.org/docs/

### 5. rap2接口文档生成typescript service
- [ ] 待实现