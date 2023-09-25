import path from "path";
import fs from "fs";
import * as STA from "swagger-typescript-api";
/* NOTE: all fields are optional expect one of `input`, `url`, `spec` */
STA.generateApi({
  name: "MySuperbApi.ts",
  // set to `false` to prevent the tool from writing to disk
  output: path.resolve(process.cwd(), "./src/__generated__"),
  url: "http://192.168.3.129:10111/auth-server/v2/api-docs",
  input: path.resolve(process.cwd(), "./foo/swagger.json"),
  //   为 http client、数据契约和路由生成分离的文件(默认值: false)
  modular: true,
  //   自定义代码输出模板
  templates: path.resolve(process.cwd(), "./api-templates"),
  //   toJS为true,httpClientType为axios,	client端请求类型，使用三方axios库 还是 原生fetch api
  httpClientType: "axios", // or "fetch"
  //   使用 default 响应状态代码作为成功响应
  defaultResponseAsSuccess: false,
  // 生成 API 类
  generateClient: true,
  //   为 API 路由生成类型定义(默认值: false)
  generateRouteTypes: false,
  //   生成有关请求响应的附加信息
  generateResponses: true,
  //   	true生成js文件，false生成ts文件
  toJS: false,
  //   将请求query生成类型定义
  extractRequestParams: false,
  //   	将请求体body生成类型定义
  extractRequestBody: false,
  extractEnums: false,
  unwrapResponseData: false,
  prettier: {
    // By default prettier config is load from your project
    printWidth: 120,
    tabWidth: 2,
    trailingComma: "all",
    parser: "typescript",
  },
  //   默认响应数据data,error类型定义，一般定义为unknown类型，默认为void
  defaultResponseType: "void",
  //   在 Api 构造器中初始化http实例属性，属性值为http client实例
  singleHttpClient: true,
  cleanOutput: false,
  //   s	将“ x-enumNames”中的数组 生成一个枚举值，枚举成员值为枚举成员字符串
  enumNamesAsValues: false,
  //   根据tags中的第一个标签名进行路由分离
  moduleNameFirstTag: false,
  //   生成所有“enum”类型作为联合类型
  generateUnionEnums: false,
  // 为ts类型名新增前缀（只针对json schema中的definitions
  typePrefix: "",
  //   	为ts类型名新增后缀（只针对json schema中的definitions）
  typeSuffix: "",
  enumKeyPrefix: "",
  enumKeySuffix: "",
  addReadonly: false,
  sortTypes: false,
  sortRouters: false,
  extractingOptions: {
    requestBodySuffix: ["Payload", "Body", "Input"],
    requestParamsSuffix: ["Params"],
    responseBodySuffix: ["Data", "Result", "Output"],
    responseErrorSuffix: [
      "Error",
      "Fail",
      "Fails",
      "ErrorData",
      "HttpError",
      "BadResponse",
    ],
  },
  /** allow to generate extra files based with this extra templates, see more below */
  extraTemplates: [],
  anotherArrayType: false,
  fixInvalidTypeNamePrefix: "Type",
  fixInvalidEnumKeyPrefix: "Value",
  codeGenConstructs: (constructs) => ({
    ...constructs,
    RecordType: (key, value) => `MyRecord<key, value>`,
  }),
  primitiveTypeConstructs: (constructs) => ({
    ...constructs,
    string: {
      "date-time": "Date",
    },
  }),
  hooks: {
    onCreateComponent: (component) => {},
    onCreateRequestParams: (rawType) => {},
    onCreateRoute: (routeData) => {},
    onCreateRouteName: (routeNameInfo, rawRouteInfo) => {},
    onFormatRouteName: (routeInfo, templateRouteName) => {},
    onFormatTypeName: (typeName, rawTypeName, schemaType) => {},
    onInit: (configuration) => {},
    onPreParseSchema: (originalSchema, typeName, schemaType) => {},
    onParseSchema: (originalSchema, parsedSchema) => {},
    onPrepareConfig: (currentConfiguration) => {},
  },
})
  .then(({ files, configuration }) => {
    files.forEach(({ content, name }) => {
      fs.writeFile(path, content, (err) => {
        if (err) {
          throw err;
        }
      });
    });
  })
  .catch((e) => console.error(e));
